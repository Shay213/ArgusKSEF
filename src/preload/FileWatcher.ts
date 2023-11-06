import chokidar, { FSWatcher } from 'chokidar'
import path from 'path'

export interface IFile {
  filename: string
  creationDate: Date | null
}

interface Handlers {
  onAdd: (file: IFile) => void
  onRemove: (filename: string) => void
  onError: (err: Error) => void
}

class FileWatcher {
  private watchers: Map<string, FSWatcher | null> = new Map([
    ['xlsx', null],
    ['xml', null]
  ])

  private getBaseName(fullPath: string): string {
    return path.basename(fullPath)
  }

  private assignHandlers(key: string, handlers: Handlers): void {
    const watcher = this.watchers.get(key)
    if (watcher) {
      const { onAdd, onRemove, onError } = handlers
      watcher
        .on('add', (path, stats) => {
          console.log('Add event fired from file watcher')
          const filename = this.getBaseName(path)
          const creationDate = stats?.birthtime ?? null
          onAdd({ filename, creationDate })
        })
        .on('unlink', (path) => {
          console.log('Unlink event fired from file watcher')
          const filename = this.getBaseName(path)
          onRemove(filename)
        })
        .on('error', (err) => {
          onError(err)
        })
    }
  }

  public async watch(
    key: string,
    folderPath: string,
    handlers: Handlers,
    ignored?: RegExp
  ): Promise<void> {
    const existingWatcher = this.watchers.get(key)
    if (existingWatcher && existingWatcher.getWatched()[folderPath.replace(/\//g, '\\')]) {
      return // Return early if a watcher instance already exists for the given file type and folder path
    }

    if (existingWatcher) {
      await existingWatcher.close()
    }

    const watcher = chokidar.watch(folderPath, {
      persistent: true,
      ignoreInitial: true,
      ignored
    })

    this.watchers.set(key, watcher)
    this.assignHandlers(key, handlers)
  }

  public async unwatch(key: string): Promise<void> {
    const watcher = this.watchers.get(key)
    if (watcher) {
      await watcher.close()
      this.watchers.set(key, null)
    }
  }

  public getWatchers(): void {
    console.log(this.watchers.values())
  }
}

export default FileWatcher
