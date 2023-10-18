import { Form } from '@renderer/components/ui/form'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Button } from '@renderer/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import defaultPodmiot3Values from '@renderer/data/defaultFormValues/defaultPodmiot3Values'
import { useEffect } from 'react'
import { CardContent } from '@renderer/components/ui/card'
import { useCreateFakturaContext } from '@renderer/context/createFakturaContext'
import FormSection from '../../FormItems-base/FormSection'
import IDNabywcy from '../../FormItems/IDNabywcy'
import NrEORI from '../../FormItems/NrEORI'
import NrKlienta from '../../FormItems/NrKlienta'
import Udzial from '../../FormItems/Udzial'
import Adres from '../../FormSections/Adres'
import DaneIdentyfikacyjne from '../../FormSections/DaneIdentyfikacyjne'
import DaneKontaktowe from '../../FormSections/DaneKontaktowe'
import Rola from '../../FormSections/Rola'

interface Props {
  getFormValueRef: (obj: { getFromValues: () => ZPodmiot3[] }) => void
}

const PodmiotInny = ({ getFormValueRef }: Props): JSX.Element => {
  const context = useCreateFakturaContext()
  const form = useForm({
    defaultValues: {
      Podmiot3:
        context?.mappedTemplate?.Faktura?.Podmiot3 ?? context?.template?.Faktura.Podmiot3 ?? []
    }
  })

  useEffect(() => {
    getFormValueRef({ getFromValues: () => form.getValues().Podmiot3 })
  }, [getFormValueRef, form])

  const { fields, append, remove } = useFieldArray({
    name: 'Podmiot3',
    control: form.control
  })

  const onSubmit = (): void => {}

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            <div className="flex flex-col gap-2">
              {fields.map((field, index) => (
                <FormSection key={field.id} title={`Podmiot Inny ${index + 1}`} size="lg">
                  <div className="flex flex-col gap-2">
                    <IDNabywcy optional formFieldNamePrefix={`Podmiot3.${index}.`} />
                    <NrEORI optional formFieldNamePrefix={`Podmiot3.${index}.`} />
                    <DaneIdentyfikacyjne
                      type="extended+IDWew"
                      formFieldNamePrefix={`Podmiot3.${index}.`}
                    />
                    <Adres formFieldNamePrefix={`Podmiot3.${index}.Adres.`} heading="Adres" />
                    <Adres
                      formFieldNamePrefix={`Podmiot3.${index}.AdresKoresp.`}
                      heading="AdresKoresp"
                      optional
                    />
                    <DaneKontaktowe optional formFieldNamePrefix={`Podmiot3.${index}.`} />
                    <Rola formFieldNamePrefix={`Podmiot3.${index}.`} />
                    <Udzial optional formFieldNamePrefix={`Podmiot3.${index}.`} />
                    <NrKlienta optional formFieldNamePrefix={`Podmiot3.${index}.`} />
                  </div>
                  <Button
                    className="mt-2"
                    type="button"
                    onClick={(): void => remove(index)}
                    variant="destructive"
                  >
                    Usuń Podmiot Inny {index + 1} <Trash2 className="w-4 h-4 ml-2" />
                  </Button>
                </FormSection>
              ))}
              <div>
                <Button type="button" onClick={(): void => append(defaultPodmiot3Values)}>
                  Dodaj Podmiot Inny <Plus className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </form>
      </Form>
    </FormProvider>
  )
}

export default PodmiotInny
