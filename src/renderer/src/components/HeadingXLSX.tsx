import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'

interface Props {
  path: string
  isAutoGenerateXML: boolean
  setIsAutoGenerateXML: (checked: boolean) => void
  handleSelectFolder: () => void
}

const HeadingXLSX = ({
  path,
  isAutoGenerateXML,
  setIsAutoGenerateXML,
  handleSelectFolder
}: Props): JSX.Element => {
  return (
    <div className="flex flex-col gap-2 h-36">
      <h2 className="text-3xl font-semibold">Pliki XLSX</h2>
      <div>
        <Button size="sm" onClick={handleSelectFolder}>
          Wybierz folder
        </Button>
      </div>
      <p className="text-sm text-muted-foreground truncate">
        <span>Ścieżka: </span>({path})
      </p>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="auto-xlsx"
          checked={isAutoGenerateXML}
          onCheckedChange={(checked): void => setIsAutoGenerateXML(checked as boolean)}
        />
        <label
          htmlFor="auto-xlsx"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Automatyczne tworzenie pliku XML
        </label>
      </div>
    </div>
  )
}

export default HeadingXLSX
