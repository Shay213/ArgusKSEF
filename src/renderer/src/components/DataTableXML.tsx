import useFolderFiles from '@renderer/hooks/useFolderFiles'
import DataTable from './DataTables/DataTable'
import { columnsXml } from './DataTables/columnsXml'
import HeadingXML from './HeadingXML'
import { useXLSXBindingsContext } from '@renderer/context/XLSXBindingsProvider'
import useWatcher from '@renderer/hooks/useWatcher'

const DataTableXML = (): JSX.Element => {
  const context = useXLSXBindingsContext()

  const { files, error, isLoading, setFiles } = useFolderFiles({ type: 'xml' })
  useWatcher({ type: 'xml', setFiles })

  const handleSelectFolder = async (): Promise<void> => {
    await context?.chooseFolderFromDialog?.('xml')
  }

  return (
    <div className="flex flex-col gap-5">
      <HeadingXML path={context?.xmlFolderPath ?? ''} handleSelectFolder={handleSelectFolder} />
      <DataTable
        // @ts-ignore not sure what the problem is
        columns={columnsXml}
        data={files}
        error={error}
        isLoading={isLoading}
      />
    </div>
  )
}

export default DataTableXML
