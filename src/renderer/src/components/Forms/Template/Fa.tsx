import { useForm, FormProvider } from 'react-hook-form'
import { useState } from 'react'
import saveTemplate from '@renderer/scripts/saveTemplate'
import { useToast } from '@renderer/components/ui/use-toast'
import { Form } from '@renderer/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import KodWaluty from '../FormItems/KodWaluty'
import P_1 from '../FormItems/P_1'
import P_1M from '../FormItems/P_1M'
import P_2 from '../FormItems/P_2'
import WZ from '../FormSections/WZ'
import OkresFa_P_6 from '../FormSections/OkresFa_P_6'
import P_13_1_P_13_5 from '../FormSections/P_13_1_P_13_5'
import P_13_6_1 from '../FormItems/P_13_6_1'
import P_13_6_2 from '../FormItems/P_13_6_2'
import FormResetButton from '@renderer/components/Buttons/FormResetButton'
import FormSaveButton from '@renderer/components/Buttons/FormStateButton'
import HomeButton from '@renderer/components/Buttons/HomeButton'
import defaultFaValues from '@renderer/data/defaultFormValues/defaultFaValues'
import FP from '../FormItems/FP'
import KursWalutyZ from '../FormItems/KursWalutyZ'
import P_13_10 from '../FormItems/P_13_10'
import P_13_11 from '../FormItems/P_13_11'
import P_13_6_3 from '../FormItems/P_13_6_3'
import P_13_7 from '../FormItems/P_13_7'
import P_13_8 from '../FormItems/P_13_8'
import P_13_9 from '../FormItems/P_13_9'
import P_15 from '../FormItems/P_15'
import RodzajFaktury from '../FormItems/RodzajFaktury'
import TP from '../FormItems/TP'
import ZwrotAkcyzy from '../FormItems/ZwrotAkcyzy'
import Adnotacje from '../FormSections/Adnotacje'
import DodatkowyOpis from '../FormSections/DodatkowyOpis'
import FaWiersz from '../FormSections/FaWiersz'
import FakturaZaliczkowa from '../FormSections/FakturaZaliczkowa'
import Korekta from '../FormSections/Korekta'
import Platnosc from '../FormSections/Platnosc'
import Rozliczenie from '../FormSections/Rozliczenie'
import WarunkiTransakcji from '../FormSections/WarunkiTransakcji'
import ZaliczkaCzesciowa from '../FormSections/ZaliczkaCzesciowa'
import Zamowienie from '../FormSections/Zamownienie'

interface Props {
  template: ITemplate
}

const Fa = ({ template }: Props): JSX.Element => {
  const [templateS, setTemplateS] = useState(template)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const { toast } = useToast()
  const form = useForm({
    //@ts-ignore template is based on defaultValues so they always have same type
    defaultValues: window.api.merge(defaultFaValues, template?.Faktura.Fa ?? {})
  })

  const onSubmit = async (values): Promise<void> => {
    setIsLoading(true)
    let transports = values.WarunkiTransakcji.Transport
    if (transports.length > 0) {
      transports = transports.map((t) => ({
        ...t,
        DataGodzRozpTransportu: t.DataGodzRozpTransportu
          ? new Date(t.DataGodzRozpTransportu).toISOString()
          : t.DataGodzRozpTransportu,
        DataGodzZakTransportu: t.DataGodzZakTransportu
          ? new Date(t.DataGodzZakTransportu).toISOString()
          : t.DataGodzZakTransportu
      }))
    }
    const modifiedValues = {
      ...values,
      WarunkiTransakcji: { ...values.WarunkiTransakcji, Transport: transports }
    }

    const content = { Faktura: { ...templateS.Faktura, Fa: modifiedValues } }
    const contentJSON = JSON.stringify(content)

    try {
      const newTemplate = await saveTemplate(contentJSON)
      setIsLoading(false)
      setTemplateS(newTemplate)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
      }, 1000)
    } catch (error) {
      setIsError(true)
      setIsLoading(false)
      setTimeout(() => {
        setIsError(false)
      }, 1000)
      toast({
        title: 'Pojawił się błąd podczas zapisu zmian'
      })
    }
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="overflow-auto max-h-[calc(100vh-300px)]">
            <CardHeader>
              <CardTitle>Fa</CardTitle>
              <CardDescription>
                Zawiera szczegółowe informacje dotyczące transakcji dokumentowanej fakturą. W
                szczególności są to elementy faktury wynikające z treści obowiązujących przepisów,
                jak również elementy dotyczące m.in. rozliczenia, płatności oraz warunków
                transakcji.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <KodWaluty />
              <P_1 />
              <P_1M optional />
              <P_2 />
              <WZ optional />
              <OkresFa_P_6 optional />
              <P_13_1_P_13_5 optional />
              <P_13_6_1 optional />
              <P_13_6_2 optional />
              <P_13_6_3 optional />
              <P_13_7 optional />
              <P_13_8 optional />
              <P_13_9 optional />
              <P_13_10 optional />
              <P_13_11 optional />
              <P_15 />
              <KursWalutyZ optional />
              <Adnotacje />
              <RodzajFaktury />
              <Korekta optional />
              <ZaliczkaCzesciowa optional />
              <FP optional />
              <TP optional />
              <DodatkowyOpis optional />
              <FakturaZaliczkowa optional />
              <ZwrotAkcyzy optional />
              <FaWiersz optional />
              <Rozliczenie optional />
              <Platnosc optional />
              <WarunkiTransakcji optional />
              <Zamowienie optional />
            </CardContent>
            <CardFooter className="flex items-center gap-2">
              <FormSaveButton
                isLoading={isLoading}
                isSuccess={isSuccess}
                isError={isError}
                disabled={isLoading}
              />
              <HomeButton isAlert disabled={isLoading} />
              <FormResetButton
                onClick={(): void => form.reset(defaultFaValues)}
                isAlert
                disabled={isLoading}
              />
            </CardFooter>
          </Card>
        </form>
      </Form>
    </FormProvider>
  )
}

export default Fa
