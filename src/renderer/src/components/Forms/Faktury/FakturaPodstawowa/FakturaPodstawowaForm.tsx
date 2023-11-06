import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import { useEffect, useRef, useState } from 'react'
import { cleanObject, formatDateToYYYYMMDD, getRandomInt } from '@renderer/lib/utils'
import convertFakturaToXML from '@renderer/scripts/convertFakturaToXML'
import FakturaPodstawowaCards from './FakturaPodstawowaCards'
import { Button } from '@renderer/components/ui/button'
import FormStateButton from '@renderer/components/Buttons/FormStateButton'
import { Plus, RefreshCcw } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import getTemplateFile from '@renderer/scripts/getTemplateFile'
import convertXLSXToObj from '@renderer/scripts/convertXLSXToObj'
import { useXLSXBindingsContext } from '@renderer/context/XLSXBindingsProvider'
import objectMapper from 'object-mapper'
import FakturaMapping from '@renderer/mappings/FakturaMapping'
import Loading from '@renderer/components/Loading'
import ErrorTemplate from '@renderer/components/ErrorTemplate'
import { useToast } from '@renderer/components/ui/use-toast'
import HomeButton from '@renderer/components/Buttons/HomeButton'

const FakturaPodstawowaForm = (): JSX.Element => {
  const [isSaving, setIsSaving] = useState(false)
  const [isErrorSaving, setIsErrorSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [mappedTemplate, setMappedTemplate] = useState<ITemplate | null>(null)
  const [refetchTrigger, setRefetchTrigger] = useState(false)
  const [step, setStep] = useState(0)
  const getFormValuesRefs = useRef<(null | IGetFormValuesRef)[]>([null, null, null, null, null])
  const navigate = useNavigate()
  const { filename } = useParams()
  const { toast } = useToast()
  const context = useXLSXBindingsContext()

  useEffect(() => {
    ;(async (): Promise<void> => {
      try {
        setIsLoading(true)
        const template = await getTemplateFile()
        // find xlsx file name in xlsxBindings
        const xlsxFileName = Object.keys(context?.xlsxBindings || {}).find((key) => {
          const xml = context?.xlsxBindings?.[key]
          return xml === `${context?.xmlFolderPath}/${filename}`
        })

        if (!xlsxFileName) {
          setIsError(true)
          setIsLoading(false)
          return
        }

        const workbook = window.api.readXlsx(`${context?.xlsxFolderPath}/${xlsxFileName}`)
        const xlsxObj = convertXLSXToObj(workbook)
        const today = new Date()
        const DataWytworzeniaFaIso = today.toISOString()
        const DataWytworzeniaFa = formatDateToYYYYMMDD(today)

        const source = { ...xlsxObj, DataWytworzeniaFaIso, DataWytworzeniaFa }

        const mappedTemplate = objectMapper(source, template, FakturaMapping)
        setTimeout(
          () => {
            setMappedTemplate(mappedTemplate)
            setIsLoading(false)
          },
          getRandomInt(500, 1000)
        )
      } catch (error) {
        setIsError(true)
        setIsLoading(false)
      }
    })()
  }, [refetchTrigger])

  const handleCreateInvoice = async (): Promise<void> => {
    if (step === FakturaPodstawowaCards.length - 1) {
      setIsSaving(true)
      const DaneFaktury = getFormValuesRefs?.current[0]?.getFromValues()
      const Sprzedawca = getFormValuesRefs?.current[1]?.getFromValues()
      const Nabywca = getFormValuesRefs?.current[2]?.getFromValues()
      const PodmiotInny = getFormValuesRefs?.current[3]?.getFromValues()
      const Stopka = getFormValuesRefs?.current[4]?.getFromValues()

      const Faktura = {
        Naglowek: mappedTemplate?.Faktura?.Naglowek,
        Podmiot1: Sprzedawca,
        Podmiot2: Nabywca,
        Podmiot3: PodmiotInny,
        Fa: DaneFaktury,
        Stopka
      }

      const cleanedFaktura = cleanObject(Faktura)
      const ksefXML = convertFakturaToXML(cleanedFaktura)
      //const previewXML = convertFakturaToXML(cleanedFaktura, true)

      if (context?.xmlFolderPath) {
        await window.api.createDir(context?.xmlFolderPath)
        const xlsxFileName = Object.keys(context?.xlsxBindings || {}).find((key) => {
          const xml = context?.xlsxBindings?.[key]
          return xml === `${context?.xmlFolderPath}/${filename}`
        })
        if (xlsxFileName) {
          try {
            await window.api.saveFile(`${context?.xmlFolderPath}/${filename}`, ksefXML, false)
            context?.saveBinding(xlsxFileName, `${context?.xmlFolderPath}/${filename}`)
            setIsSaving(false)
            setIsSaved(true)
            setTimeout(() => {
              navigate('/')
              toast({
                title: 'Plik xml został zapisany pomyślnie'
              })
            }, 1000)
          } catch (error) {
            toast({
              title: 'Nie udało się zapisać pliku xml'
            })
            setIsSaving(false)
            setIsErrorSaving(false)
          }
        } else {
          setIsSaving(false)
          setIsErrorSaving(false)
          toast({
            title: 'Nie znaleziono pliku xlsx'
          })
        }
      }
    }
  }
  const handleNext = (): void => {
    setStep((prev) => prev + 1)
  }
  const handlePrev = (): void => {
    setStep((prev) => prev - 1)
  }

  return (
    <div className="p-10 h-full flex flex-col">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">
          Edycja pliku <span className="text-base">{filename}</span>
        </h1>
        <div>
          <HomeButton
            dialogTitle="Jesteś absolutnie pewien?"
            dialogDescription="Wszystkie niezapisane zmiany zostaną utracone"
            isAlert
          />
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="relative w-4/5 lg:w-2/3 max-w-[1200px] h-[600px] overflow-hidden">
          <div
            className={`grid grid-cols-5 absolute top-0 left-0 w-[500%] h-full transition-all duration-300 ease-in`}
            style={{ left: `-${100 * step}%` }}
          >
            {isLoading ? (
              <Loading text="Trwa ładowanie zawartości" />
            ) : isError ? (
              <div>
                <ErrorTemplate>
                  <Button
                    variant="ghost"
                    onClick={(): void => {
                      setRefetchTrigger((prev) => !prev)
                    }}
                  >
                    Spróbuj ponownie <RefreshCcw className="w-4 h-4 ml-2" />
                  </Button>
                </ErrorTemplate>
              </div>
            ) : (
              FakturaPodstawowaCards.map(({ title, description, element: Element }, i) => (
                <Card key={title} className="overflow-auto max-h-[650px] flex flex-col">
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                  <div className="flex-1">
                    <Element
                      getFormValueRef={(obj): void => {
                        getFormValuesRefs.current[i] = obj
                      }}
                      mappedTemplate={mappedTemplate}
                    />
                  </div>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      type="button"
                      disabled={step === 0}
                      onClick={handlePrev}
                    >
                      Wróć
                    </Button>
                    {i === FakturaPodstawowaCards.length - 1 ? (
                      <FormStateButton
                        loadingText="Tworzenie faktury"
                        errorText="Błąd podczas tworzenia"
                        successText="Stworzono fakturę"
                        type="button"
                        isLoading={isSaving}
                        isError={isErrorSaving}
                        isSuccess={isSaved}
                        onClick={handleCreateInvoice}
                      >
                        Stwórz Fakturę <Plus className="w-4 h-4 ml-2" />
                      </FormStateButton>
                    ) : (
                      <Button type="button" onClick={handleNext}>
                        Dalej
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FakturaPodstawowaForm
