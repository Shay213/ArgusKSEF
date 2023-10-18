import { useDropzone } from 'react-dropzone'
import { cn } from '@renderer/lib/utils'
import XLSXIcon from './XLSXIcon'

interface Props {
  setFile: React.Dispatch<React.SetStateAction<File | null | undefined>>
  file: File | null | undefined
  className?: string
}

const Dropzone = ({ setFile, className, file }: Props): JSX.Element => {
  const { getRootProps, getInputProps, fileRejections, isDragActive } = useDropzone({
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xslx']
    },
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles?.length) {
        setFile(acceptedFiles[0])
      }
    },
    onDragEnter: () => {
      //
    },
    onDragLeave: () => {
      //
    },
    onDragOver: () => {
      //
    }
  })

  const isAcceptedFile = !!file
  const isRejectedFile = fileRejections?.length !== 0

  return (
    <section className={`${className} flex justify-center items-center cursor-pointer`}>
      <div
        {...getRootProps({
          className: cn(
            'w-[500px] h-[350px] flex flex-col justify-center items-center gap-4 border border-dashed rounded-sm border-2 transition border-gray-200',
            {
              'border-red-500': isRejectedFile,
              'border-gray-500': isDragActive
            }
          )
        })}
      >
        <input {...getInputProps()} />
        <XLSXIcon
          isFile={isAcceptedFile}
          isDragging={isDragActive}
          handleX={(e): void => {
            e.stopPropagation()
            setFile(null)
          }}
        />
        {isAcceptedFile ? (
          file.name
        ) : (
          <>
            {isRejectedFile ? (
              <p className="text-red-500">
                Tylko pliki xlsx są akceptowane. Proszę wybrać prawidłowy plik.
              </p>
            ) : (
              <p>Przeciągnij i upuść tutaj plik xlsx lub kliknij, aby wybrać plik</p>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default Dropzone
