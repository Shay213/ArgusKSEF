import { Button } from './ui/button'

interface Props {
  path: string
  handleSelectFolder: () => void
}

const HeadingXML = ({ handleSelectFolder, path }: Props): JSX.Element => {
  return (
    <div className="flex flex-col gap-2 h-36">
      <h2 className="text-3xl font-semibold">Pliki XML</h2>
      <div>
        <Button size="sm" onClick={handleSelectFolder}>
          Wybierz folder
        </Button>
      </div>
      <p className="text-sm text-muted-foreground truncate">
        <span>Ścieżka: </span>({path})
      </p>
    </div>
  )
}

export default HeadingXML
