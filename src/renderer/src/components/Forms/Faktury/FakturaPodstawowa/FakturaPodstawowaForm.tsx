import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import { useRef, useState } from 'react'
import { useCreateFakturaContext } from '@renderer/context/createFakturaContext'
import { cleanObject, getRandomInt } from '@renderer/lib/utils'
import convertFakturaToXML from '@renderer/scripts/convertFakturaToXML'
import FakturaPodstawowaCards from './FakturaPodstawowaCards'
import { XMLValidator } from 'fast-xml-parser'
import { Button } from '@renderer/components/ui/button'
import FormStateButton from '@renderer/components/Buttons/FormStateButton'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const FakturaPodstawowaForm = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [step, setStep] = useState(0)
  const getFormValuesRefs = useRef<(null | IGetFormValuesRef)[]>([null, null, null, null, null])
  const context = useCreateFakturaContext()
  const navigate = useNavigate()

  const handleCreateInvoice = (): void => {
    if (step === FakturaPodstawowaCards.length - 1) {
      setIsLoading(true)
      const DaneFaktury = getFormValuesRefs?.current[0]?.getFromValues()
      const Sprzedawca = getFormValuesRefs?.current[1]?.getFromValues()
      const Nabywca = getFormValuesRefs?.current[2]?.getFromValues()
      const PodmiotInny = getFormValuesRefs?.current[3]?.getFromValues()
      const Stopka = getFormValuesRefs?.current[4]?.getFromValues()

      const Faktura = {
        Naglowek: context?.template?.Faktura.Naglowek,
        Podmiot1: Sprzedawca,
        Podmiot2: Nabywca,
        Podmiot3: PodmiotInny,
        Fa: DaneFaktury,
        Stopka
      }
      const cleanedFaktura = cleanObject(Faktura)

      // create local version of xml and ksef version
      const ksefXML = convertFakturaToXML(cleanedFaktura)
      const previewXML = convertFakturaToXML(cleanedFaktura, true)

      context?.setKsefXML(ksefXML)
      context?.setPreviewXML(previewXML)

      // validates only structure of xml, it does not validate against a xsd schema
      const ksefXMLValidationResult = XMLValidator.validate(ksefXML)

      // TODO: validate against a schema

      if (ksefXMLValidationResult === true) {
        // check only ksefXML, this is more important than preview
        setTimeout(
          () => {
            setIsLoading(false)
            setIsSuccess(true)
            setTimeout(() => {
              setIsSuccess(false)
              navigate('/faktura-podstawowa/success')
            }, 1000)
          },
          getRandomInt(700, 1200)
        )
      } else {
        setTimeout(
          () => {
            setIsLoading(false)
            setIsError(true)
            setTimeout(() => {
              setIsError(false)
              navigate('/faktura-podstawowa/error')
            }, 1000)
          },
          getRandomInt(500, 1000)
        )
      }
      return
    }
  }
  const handleNext = (): void => {
    setStep((prev) => prev + 1)
  }
  const handlePrev = (): void => {
    setStep((prev) => prev - 1)
  }

  return (
    <div className="h-full flex justify-center items-center">
      <div className="relative w-4/5 lg:w-2/3 max-w-[1200px] h-[600px] overflow-hidden">
        <div
          className={`grid grid-cols-5 absolute top-0 left-0 w-[500%] h-full transition-all duration-300 ease-in`}
          style={{ left: `-${100 * step}%` }}
        >
          {FakturaPodstawowaCards.map(({ title, description, element: Element }, i) => (
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
                />
              </div>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  type="button"
                  disabled={step === 0 || isLoading || isError || isSuccess}
                  onClick={handlePrev}
                >
                  Wróć
                </Button>
                {i === FakturaPodstawowaCards.length - 1 ? (
                  <FormStateButton
                    isLoading={isLoading}
                    isError={isError}
                    isSuccess={isSuccess}
                    loadingText="Tworzenie faktury"
                    errorText="Błąd podczas tworzenia"
                    successText="Stworzono fakturę"
                    type="button"
                    disabled={isLoading || isError || isSuccess}
                    onClick={handleCreateInvoice}
                  >
                    Stwórz Fakturę <Plus className="w-4 h-4 ml-2" />
                  </FormStateButton>
                ) : (
                  <Button
                    type="button"
                    disabled={isLoading || isError || isSuccess}
                    onClick={handleNext}
                  >
                    Dalej
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FakturaPodstawowaForm
