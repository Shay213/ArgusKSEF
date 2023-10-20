import chokidar, { FSWatcher } from 'chokidar'
import path from 'path'
import {format} from 'date-fns'


interface Handlers {
  onAdd: (file: {filename: string, creationDate: string | null}) => void
  onRemove: (filename: string) => void
  onError: (err: Error) => void
}

const getBaseName = (fullPath: string): string => path.basename(fullPath)

class FileWatcher {
  watchers: Map<string, FSWatcher | null>
  constructor() {
    this.watchers = new Map()
  }

  createWatcher(key: string): void {
    if (!this.watchers.has(key)) {
      this.watchers.set(key, null)
    }
  }

  async closeWatcher(key: string): Promise<void> {
    if (this.watchers.has(key)) {
      const watcher = this.watchers.get(key)
      if (watcher) {
        await watcher.close()
        this.watchers.set(key, null)
      }
    }
  }

  async watch(key: string, folderPath: string, handlers: Handlers, ignored?: RegExp): Promise<void> {
    const {onAdd, onError, onRemove} = handlers
    this.createWatcher(key)

    if (this.watchers.get(key)) {
      await this.closeWatcher(key)
    }

    const watcher = chokidar.watch(folderPath, {
      persistent: true,
      ignoreInitial: true,
      ignored
    })

    watcher
      .on('add', (path, stats) => {
        const filename = getBaseName(path)
        const creationDate = stats?.birthtime ? format(stats.birthtime, 'dd-MM-yyyy') : null;
        onAdd({ filename, creationDate })
      })
      .on('unlink', (path) => {
        const filename = getBaseName(path)
        onRemove(filename)
      })
      .on('error', (err) => {
        onError(err)
      })

    this.watchers.set(key, watcher)
  }

  getWatchers(): void {
    console.log(this.watchers.values())
  }
}

export default FileWatcher
