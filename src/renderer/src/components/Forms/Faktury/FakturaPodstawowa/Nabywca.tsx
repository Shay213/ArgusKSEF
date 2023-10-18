import { FormProvider, useForm } from 'react-hook-form'
import { Form } from '@renderer/components/ui/form'
import defaultPodmiot2Values from '@renderer/data/defaultFormValues/defaultPodmiot2Values'
import { useEffect } from 'react'
import { CardContent } from '@renderer/components/ui/card'
import { useCreateFakturaContext } from '@renderer/context/createFakturaContext'
import IDNabywcy from '../../FormItems/IDNabywcy'
import NrEORI from '../../FormItems/NrEORI'
import NrKlienta from '../../FormItems/NrKlienta'
import Adres from '../../FormSections/Adres'
import DaneIdentyfikacyjne from '../../FormSections/DaneIdentyfikacyjne'
import DaneKontaktowe from '../../FormSections/DaneKontaktowe'

interface Props {
  getFormValueRef: (obj: { getFromValues: () => ZPodmiot2 }) => void
}

const Nabywca = ({ getFormValueRef }: Props): JSX.Element => {
  const context = useCreateFakturaContext()
  const form = useForm({
    // @ts-ignore need to fix zod schema
    defaultValues:
      context?.mappedTemplate?.Faktura?.Podmiot2 ??
      context?.template?.Faktura.Podmiot2 ??
      defaultPodmiot2Values
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
              <NrEORI optional />
              <DaneIdentyfikacyjne type="extended" />
              <Adres formFieldNamePrefix="Adres." heading="Adres" />
              <Adres formFieldNamePrefix="AdresKoresp." heading="AdresKoresp" optional />
              <DaneKontaktowe optional />
              <NrKlienta optional />
              <IDNabywcy optional />
            </div>
          </CardContent>
        </form>
      </Form>
    </FormProvider>
  )
}

export default Nabywca
