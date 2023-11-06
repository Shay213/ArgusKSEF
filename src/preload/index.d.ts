import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      saveFile: (pathToFile: string, fileContent: string, isResource: boolean) => Promise<void>
      readFile: (pathToFile: string, isResource?: boolean) => Promise<string>
      isFileInDir: (pathToFile: string, isResource: boolean) => Promise<void>
      readXlsx: (pathToFile: string) => WorkBook
      createDir: (path: string) => Promise<void>
      merge: <T>(a: T, b: T) => T
      getPreviewXMLHeading: () => string
      showSaveDialog: (xml: string) => void
      onSaveDialogResponse: () => Promise<{
        success: boolean
        error: string
      }>
      getFolderPath: () => void
      onGetFolderPathResponse: () => Promise<string | null>
      getFolderFiles: (folderPath: string) => Promise<
        {
          filename: string
          creationDate: Date | null
        }[]
      >
      startWatcher: (
        type: 'xlsx' | 'xml',
        folderPath: string,
        handlers: {
          onAdd: (file: IFile) => void
          onRemove: (filename: string) => void
          onError: (err: Error) => void
        }
      ) => Promise<void>
      showInFileExplorer: (path: string) => void
    }
  }
}
