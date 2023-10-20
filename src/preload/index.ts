import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import fs from 'fs'
import path from 'path'
import {promises as fsPromises} from 'fs'
import {format} from 'date-fns'
import FileWatcher from './FileWatcher'
const merge = require('deepmerge')
// deepmerge ESM was dropped due to a webpack bug

const filesPath = path.join(__dirname, '../../resources')
const fileWatcher = new FileWatcher()

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
    ipcRenderer.once('save-dialog-response', (_event, result) => {
      callback(result)
    })
  },
  getFolderPath: (): void => {
    ipcRenderer.send('folder-path-dialog')
  },
  onGetFolderPathResponse: (callback: (folderPath: string | null) => void): void => {
    ipcRenderer.once(`folder-path-dialog-response`, (_event, folderPath) => {
      callback(folderPath)
    })
  },
  getFolderFiles: async (folderPath: string): Promise<{
    filename: string;
      creationDate: string
}[]> => {
    const files = await fsPromises.readdir(folderPath)
    const filteredFiles: {filename: string, creationDate: string}[] = []

    for (const file of files) {
      const fileExtension = path.extname(file).toLowerCase()

      //if (fileExtension === '.xlsx') {
        const filePath = path.join(folderPath, file)
        const stats = await fsPromises.stat(filePath)
        const creationDate = format(stats.birthtime, 'dd-MM-yyyy')
        filteredFiles.push({filename: file, creationDate})
      //}
    }
    return filteredFiles
  },
  startWatcher: async (
    type: 'xlsx' | 'xml',
    folderPath: string,
    handlers: {
      onAdd: (file: { filename: string; creationDate: string | null }) => void
      onRemove: (filename: string) => void
      onError: (err: Error) => void
    }
  ): Promise<void> => {
    console.log(folderPath, type)
    await fileWatcher.watch(type, folderPath, handlers)
    console.log(fileWatcher.getWatchers())
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
