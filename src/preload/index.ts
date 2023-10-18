import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import fs from 'fs'
import path from 'path'
const merge = require('deepmerge')
// deepmerge ESM was dropped due to a webpack bug

const filesPath = path.join(__dirname, '../../resources')

// Custom APIs for renderer
const api = {
  saveFile: (
    fileName: string,
    fileContent: string,
    callback: (err: NodeJS.ErrnoException | null) => void
  ): void => {
    //console.log(filesPath)
    fs.writeFile(path.join(filesPath, fileName), fileContent, (err) =>
      err ? callback(err) : callback(null)
    )
  },
  readFile: (
    fileName: string,
    callback: (err: NodeJS.ErrnoException | null, data: string) => void
  ): void => {
    fs.readFile(path.join(filesPath, fileName), 'utf-8', (err, data) => {
      callback(err, data)
    })
  },
  isFileInDir: (fileName: string, callback: (err: NodeJS.ErrnoException | null) => void): void => {
    fs.access(path.join(filesPath, fileName), fs.constants.F_OK, (err) => {
      callback(err)
    })
  },
  merge: <T>(a: T, b: T): T => merge(a, b),
  getPreviewXMLHeading: (): string => {
    return `
    <?xml version="1.0" encoding="UTF-8"?>
    <?xml-stylesheet type="text/xsl" href="${path.join(filesPath, 'styl.xsl')}"?>
    <Faktura
      xmlns="http://crd.gov.pl/wzor/2023/06/29/12648/"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://crd.gov.pl/wzor/2023/06/29/12648/ ${path.join(
        filesPath,
        'schemat.xsd'
      )}">
    `
  },
  showSaveDialog: (xml: string): void => {
    ipcRenderer.send('show-save-dialog', xml)
  },
  onSaveDialogResponse: (callback: (obj: { success: boolean; error: string }) => void): void => {
    ipcRenderer.on('save-dialog-response', (_event, result) => {
      callback(result)
    })
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
