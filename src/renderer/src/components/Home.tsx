import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import useWatcher from "@renderer/hooks/useWatcher"

const Home = (): JSX.Element => {
  const { toast } = useToast()

  const {error: xlsxError, files: xlsxFiles, isLoading: xlsxIsLoading, refetch: xlsxRefetch, chooseFolderFromDialog: xlsxChooseFolderFromDialog} = useWatcher({type: 'xlsx'})
  const {error: xmlError, files: xmlFiles, isLoading, xmlIsLoading, refetch: xmlRefetch, chooseFolderFromDialog: xmlChooseFolderFromDialog} = useWatcher({type: 'xml'})

  const onSuccess = (): void => {
    toast({
      title: 'Ścieżka do folderu została zapisana pomyślnie.'
    })
  }
  const onError = (): void => {
    toast({
      title: 'Nie udało się zapisać ścieżki do folderu.',
      variant: 'destructive'
    })
  }
  console.log({xlsxFiles, xmlFiles})
  return (
    <div className="h-full flex flex-col">
      <div className="pl-10 pt-4">
        <h1 className="text-5xl font-semibold">Wybór Faktury</h1>
      </div>
      <Button onClick={(): void => xlsxChooseFolderFromDialog({onError, onSuccess})}>Choose Folder for XLSX</Button>
      <Button onClick={(): void => xmlChooseFolderFromDialog({onError, onSuccess})}>Choose Folder for XML</Button>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 border">
          {xlsxFiles.map((file) => (
            <div key={file.filename} className="border p-5">
              <p>{file.filename}</p>
              <p>{file.creationDate}</p>
            </div>
          ))}
        </div>
        <div className="p-5 border">
        {xmlFiles.map((file) => (
          <div key={file.filename} className="border p-5">
            <p>{file.filename}</p>
            <p>{file.creationDate}</p>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Home
