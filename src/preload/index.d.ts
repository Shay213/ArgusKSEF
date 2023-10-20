import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      saveFile: (
        fileName: string,
        fileContent: string,
        callback: (err: NodeJS.ErrnoException | null) => void
      ) => void
      readFile: (
        fileName: string,
        callback: (err: NodeJS.ErrnoException | null, data: string) => void
      ) => void
      isFileInDir: (fileName: string, callback: (err: NodeJS.ErrnoException | null) => void) => void
      merge: <T>(a: T, b: T) => T
      getPreviewXMLHeading: () => string
      showSaveDialog: (xml: string) => void
      onSaveDialogResponse: (callback: (obj: { success: boolean; error: string }) => void) => void
      getFolderPath: () => void
      onGetFolderPathResponse: (callback: (folderPath: string | null) => void) => void
      getFolderFiles: (folderPath: string) => Promise<{
        filename: string;
        creationDate: string;
    }[]>
    startWatcher: (type: 'xlsx' | 'xml', folderPath: string, handlers: {
      onAdd: (file: {
          filename: string;
          creationDate: string | null;
      }) => void;
      onRemove: (filename: string) => void;
      onError: (err: Error) => void;
  }) => Promise<void>
    }
  }
}
