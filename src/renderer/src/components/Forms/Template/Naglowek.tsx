import { Form, FormField } from '@renderer/components/ui/form'
import { useForm } from 'react-hook-form'
import saveTemplate from '@renderer/scripts/saveTemplate'
import FormSaveButton from '@renderer/components/Buttons/FormStateButton'
import HomeButton from '@renderer/components/Buttons/HomeButton'
import { useToast } from '@renderer/components/ui/use-toast'
import defaultNaglowekValues from '@renderer/data/defaultFormValues/defaultNaglowekValues'
import { useState } from 'react'
import BasicFormItem from '../FormItems-base/BasicFormItem'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@renderer/components/ui/card'

interface Props {
  template: ITemplate
}

const Naglowek = ({ template }: Props): JSX.Element => {
  const [templateS, setTemplateS] = useState(template)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const { toast } = useToast()
  const form = useForm<ZNaglowek>({
    defaultValues: window.api.merge(defaultNaglowekValues, template?.Faktura.Naglowek ?? {})
  })

  const onSubmit = async (values: ZNaglowek): Promise<void> => {
    setIsLoading(true)
    const content = { Faktura: { ...templateS.Faktura, Naglowek: values } }
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="overflow-auto max-h-[calc(100vh-300px)]">
          <CardHeader>
            <CardTitle>Naglowek</CardTitle>
            <CardDescription>
              Zawiera m. in. dane dotyczące daty i czasu wytworzenia faktury oraz nazwy systemu
              teleinformatycznego, z którego korzysta podatnik
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="KodFormularza.#text"
                render={({ field }): JSX.Element => (
                  <BasicFormItem field={field} label="KodFormularza" readOnly />
                )}
              />
              <FormField
                control={form.control}
                name="KodFormularza.@_kodSystemowy"
                render={({ field }): JSX.Element => (
                  <BasicFormItem field={field} label="KodSystemowy" readOnly />
                )}
              />
              <FormField
                control={form.control}
                name="KodFormularza.@_wersjaSchemy"
                render={({ field }): JSX.Element => (
                  <BasicFormItem field={field} label="Wersja Schemy" readOnly />
                )}
              />
              <FormField
                control={form.control}
                name="WariantFormularza"
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="WariantFormularza"
                    readOnly
                    tooltipMessage="Pole zawiera oznaczenie schematu. Obecnie jest to wartość: 2.Jest to drugi wariant schemy - FA(2)."
                  />
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="DataWytworzeniaFa"
              render={({ field }): JSX.Element => (
                <BasicFormItem
                  field={field}
                  label="DataWytworzeniaFa"
                  readOnly
                  placeholder="Automatycznie generowane"
                  tooltipMessage="Data i czas wytworzenia faktury

                  Podaje się datę i godzinę wytworzenia faktury (pliku xml), w
                  formacie RRRR-MM-DDTGG:MM:SS (np.: 2023-09-
                  01T09:30:47Z; gdzie T oznacza „Time”).
                  Z – ZULU – jest to określenie strefy czasowej, odpowiadającej
                  uniwersalnemu czasowi koordynowanemu (UTC).

                  DataWytworzeniaFa może być inna niż data wskazana w polu
                  P_1 oraz może być inna niż data faktycznego przesłania faktury
                  do KSeF."
                />
              )}
            />
            <FormField
              control={form.control}
              name="SystemInfo"
              render={({ field }): JSX.Element => (
                <BasicFormItem
                  field={field}
                  label="SystemInfo"
                  optional
                  tooltipMessage="Nazwa systemu teleinformatycznego, z którego korzysta
                    podatnik [pole fakultatywne]"
                />
              )}
            />
          </CardContent>
          <CardFooter className="flex items-center gap-2">
            <FormSaveButton
              isLoading={isLoading}
              isSuccess={isSuccess}
              isError={isError}
              disabled={isLoading}
            />
            <HomeButton isAlert disabled={isLoading} />
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default Naglowek
