import { FormProvider, useForm } from 'react-hook-form'
import { Form } from '@renderer/components/ui/form'
import defaultPodmiot1Values from '@renderer/data/defaultFormValues/defaultPodmiot1Values'
import { useEffect } from 'react'
import { CardContent } from '@renderer/components/ui/card'
import { useCreateFakturaContext } from '@renderer/context/createFakturaContext'
import NrEORI from '../../FormItems/NrEORI'
import PrefiksPodatnika from '../../FormItems/PrefiksPodatnika'
import StatusInfoPodatnika from '../../FormItems/StatusInfoPodatnika'
import Adres from '../../FormSections/Adres'
import DaneIdentyfikacyjne from '../../FormSections/DaneIdentyfikacyjne'
import DaneKontaktowe from '../../FormSections/DaneKontaktowe'

interface Props {
  getFormValueRef: (obj: { getFromValues: () => ZPodmiot1 }) => void
}

const Sprzedawca = ({ getFormValueRef }: Props): JSX.Element => {
  const context = useCreateFakturaContext()
  const form = useForm({
    // @ts-ignore need to fix zod schema
    defaultValues:
      context?.mappedTemplate?.Faktura?.Podmiot1 ??
      context?.template?.Faktura.Podmiot1 ??
      defaultPodmiot1Values
  })

  useEffect(() => {
    getFormValueRef({ getFromValues: () => form.getValues() })
  }, [getFormValueRef, form])

  const onSubmit = (): void => {}

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            <div className="flex flex-col gap-2">
              <PrefiksPodatnika
                optional
                handleSelect={(value): void =>
                  form.setValue('PrefiksPodatnika', value.toUpperCase())
                }
              />
              <NrEORI optional />
              <DaneIdentyfikacyjne />
              <Adres heading="Adres" headingSize="lg" formFieldNamePrefix="Adres." />
              <Adres heading="AdresKoresp" headingSize="lg" formFieldNamePrefix="AdresKoresp." />
              <DaneKontaktowe optional />
              <StatusInfoPodatnika optional />
            </div>
          </CardContent>
        </form>
      </Form>
    </FormProvider>
  )
}

export default Sprzedawca
