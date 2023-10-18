import excelIcon from '@renderer/assets/icons8-excel.svg'
import { cn } from '@renderer/lib/utils'
import { X } from 'lucide-react'
import { MouseEvent } from 'react'

type Props = {
  isFile: boolean
  isDragging: boolean
  handleX: (e: MouseEvent) => void
}

const XLSXIcon = ({ handleX, isDragging, isFile }: Props): JSX.Element => {
  return (
    <div className="flip-container w-[160px] h-[160px]">
      <div className={cn('flipper w-full h-full', { flipY: isDragging })}>
        <div className="front absolute w-full h-full">
          <img src={excelIcon} alt="excel-icon" width={160} height={160} />
          {isFile && (
            <div
              className="w-8 h-8 bg-red-500 absolute top-0 right-0 rounded-full flex justify-center items-center z-10"
              onClick={(e): void => handleX(e)}
            >
              <X className="w-6 h-6 text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default XLSXIcon
