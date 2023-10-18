import { useState } from 'react'
import Dropzone from './Dropzone'
import TooltipButton from './TooltipButton'
import { Button } from './ui/button'

interface Props {
  handleClick: (xlsxFile?: File | null | undefined) => void
}

const UploadXLSX = ({ handleClick }: Props): JSX.Element => {
  const [xlsxFile, setXlsxFile] = useState<null | undefined | File>(null)

  return (
    <div className="flex flex-col items-center gap-7">
      <Dropzone setFile={setXlsxFile} file={xlsxFile} />
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={(): void => handleClick()}>
          Pomiń
        </Button>
        <TooltipButton
          content="Dalej"
          tooltipMessage="Dodaj plik xlsx aby kontynuować"
          onClick={(): void => handleClick(xlsxFile)}
          variant={!xlsxFile ? 'disabled' : 'default'}
        />
      </div>
    </div>
  )
}

export default UploadXLSX
