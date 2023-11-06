import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import fs from 'fs'
import path from 'path'
import { promises as fsPromises } from 'fs'
import FileWatcher, { IFile } from './FileWatcher'
import { WorkBook, readFile } from 'xlsx'
const merge = require('deepmerge')
// deepmerge ESM was dropped due to a webpack bug

const filesPath = path.join(__dirname, '../../resources')
const fileWatcher = new FileWatcher()

// Custom APIs for renderer
const api = {
  saveFile: async (pathToFile: string, fileContent: string, isResource: boolean): Promise<void> => {
    const filePath = isResource ? path.join(filesPath, pathToFile) : pathToFile
    await fsPromises.writeFile(filePath, fileContent)
  },
  readFile: async (pathToFile: string, isResource: boolean = true): Promise<string> => {
    const resPath = isResource ? path.join(filesPath, pathToFile) : pathToFile
    const data = await fsPromises.readFile(resPath, 'utf-8')
    return data
  },
  isFileInDir: async (pathToFile: string, isResource: boolean): Promise<void> => {
    const resPath = isResource ? path.join(filesPath, pathToFile) : pathToFile
    await fsPromises.access(resPath, fs.constants.F_OK)
  },
  createDir: async (path: string): Promise<void> => {
    try {
      await fsPromises.access(path, fs.constants.F_OK)
    } catch (err) {
      await fsPromises.mkdir(path)
    }
  },
  readXlsx: (pathToFile: string): WorkBook => readFile(pathToFile),
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
  onSaveDialogResponse: async (): Promise<{ success: boolean; error: string }> => {
    return new Promise((resolve) => {
      ipcRenderer.once('save-dialog-response', (_event, result) => {
        resolve(result)
      })
    })
  },
  getFolderPath: (): void => {
    ipcRenderer.send('folder-path-dialog')
  },
  onGetFolderPathResponse: async (): Promise<string | null> => {
    return new Promise((resolve) => {
      ipcRenderer.once(`folder-path-dialog-response`, (_event, folderPath) => {
        resolve(folderPath)
      })
    })
  },
  getFolderFiles: async (folderPath: string): Promise<IFile[]> => {
    const files = await fsPromises.readdir(folderPath)
    const filteredFiles: IFile[] = []

    for (const file of files) {
      const fileExtension = path.extname(file).toLowerCase()

      if (fileExtension === '.xlsx' || fileExtension === '.xml') {
        const filePath = path.join(folderPath, file)
        const stats = await fsPromises.stat(filePath)
        filteredFiles.push({ filename: file, creationDate: stats.birthtime })
      }
    }
    return filteredFiles
  },
  startWatcher: async (
    type: 'xlsx' | 'xml',
    folderPath: string,
    handlers: {
      onAdd: (file: IFile) => void
      onRemove: (filename: string) => void
      onError: (err: Error) => void
    }
  ): Promise<void> => {
    await fileWatcher.watch(type, folderPath, handlers)
  },
  showInFileExplorer: (path: string): void => {
    ipcRenderer.send('show-in-file-explorer', path)
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
