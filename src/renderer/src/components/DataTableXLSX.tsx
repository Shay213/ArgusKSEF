import CreateXMLFromTableProvider from '@renderer/context/CreateXMLFromTableProvider'
import DataTable from './DataTables/DataTable'
import { columnsXlsx } from './DataTables/columnsXlsx'
import useFolderFiles from '@renderer/hooks/useFolderFiles'
import { useXLSXBindingsContext } from '@renderer/context/XLSXBindingsProvider'
import HeadingXLSX from './HeadingXLSX'
import useAutoGenerateXML from '@renderer/hooks/useAutoGenerateXML'
import useWatcher from '@renderer/hooks/useWatcher'

const DataTableXLSX = (): JSX.Element => {
  const context = useXLSXBindingsContext()

  const { isAutoGenerateXML, setIsAutoGenerateXML } = useAutoGenerateXML()
  const { files, error, isLoading, setFiles } = useFolderFiles({ type: 'xlsx' })
  useWatcher({ type: 'xlsx', setFiles, isAutoGenerateXML })

  const extendedXlsxFilesData = files.map((file) => ({
    ...file,
    binding: context?.xlsxBindings?.[file.filename]
  }))

  const handleSelectFolder = async (): Promise<void> => {
    await context?.chooseFolderFromDialog?.('xlsx')
  }

  return (
    <div className="flex flex-col gap-5">
      <HeadingXLSX
        path={context?.xlsxFolderPath ?? ''}
        isAutoGenerateXML={isAutoGenerateXML}
        setIsAutoGenerateXML={setIsAutoGenerateXML}
        handleSelectFolder={handleSelectFolder}
      />
      <CreateXMLFromTableProvider>
        <DataTable
          // @ts-ignore not sure what the problem is
          columns={columnsXlsx}
          data={extendedXlsxFilesData ?? []}
          error={error}
          isLoading={isLoading}
          type="xlsx"
        />
      </CreateXMLFromTableProvider>
    </div>
  )
}

export default DataTableXLSX
