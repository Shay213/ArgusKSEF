import { CardContent } from '@renderer/components/ui/card'
import { Form } from '@renderer/components/ui/form'
import { useCreateFakturaContext } from '@renderer/context/createFakturaContext'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Informacje from '../../FormSections/Informacje'
import Rejestry from '../../FormSections/Rejestry'

interface Props {
  getFormValueRef: (obj: { getFromValues: () => ZStopka }) => void
}

const defaultStopkaValues = {
  Informacje: [],
  Rejestry: []
}

const Stopka = ({ getFormValueRef }: Props): JSX.Element => {
  const context = useCreateFakturaContext()
  const form = useForm({
    // @ts-ignore need to recreate zod schema
    defaultValues:
      context?.mappedTemplate?.Faktura?.Stopka ??
      context?.template?.Faktura.Stopka ??
      defaultStopkaValues
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
              <Informacje />
              <Rejestry />
            </div>
          </CardContent>
        </form>
      </Form>
    </FormProvider>
  )
}

export default Stopka
