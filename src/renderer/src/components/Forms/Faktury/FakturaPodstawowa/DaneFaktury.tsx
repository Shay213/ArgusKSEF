import { FormProvider, useForm } from 'react-hook-form'
import { Form } from '@renderer/components/ui/form'
import defaultFaValues from '@renderer/data/defaultFormValues/defaultFaValues'
import { useEffect } from 'react'
import { CardContent } from '@renderer/components/ui/card'
import FormSection from '../../FormItems-base/FormSection'
import FP from '../../FormItems/FP'
import TP from '../../FormItems/TP'
import ZwrotAkcyzy from '../../FormItems/ZwrotAkcyzy'
import Adnotacje from '../../FormSections/Adnotacje'
import DodatkowyOpis from '../../FormSections/DodatkowyOpis'
import Platnosc from '../../FormSections/Platnosc'
import Rozliczenie from '../../FormSections/Rozliczenie'
import WarunkiTransakcji from '../../FormSections/WarunkiTransakcji'
import SzczegolyFaktury from './SzczegolyFaktury'
import FaWierszFakturaPodstawowa from './FaWierszFakturaPodstawowa'

interface Props {
  getFormValueRef: (obj: { getFromValues: () => ZFa }) => void
  mappedTemplate: ITemplate | null
}

const DaneFaktury = ({ getFormValueRef, mappedTemplate }: Props): JSX.Element => {
  const form = useForm({
    // @ts-ignore need to recreate zod schema
    defaultValues: mappedTemplate?.Faktura.Fa ?? defaultFaValues
  })

  useEffect(() => {
    getFormValueRef({ getFromValues: () => form.getValues() })
  }, [getFormValueRef, form])

  const onSubmit = (): void => {}

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 h-full flex flex-col justify-between"
        >
          <CardContent>
            <div className="flex flex-col gap-2">
              <SzczegolyFaktury />
              <Adnotacje />
              <FaWierszFakturaPodstawowa />
              <FormSection title="Dodatkowe Informacje" size="lg">
                <div className="flex flex-col gap-2">
                  <TP />
                  <FP />
                  <ZwrotAkcyzy />
                  <DodatkowyOpis optional />
                </div>
              </FormSection>
              <Rozliczenie />
              <Platnosc />
              <WarunkiTransakcji />
            </div>
          </CardContent>
        </form>
      </Form>
    </FormProvider>
  )
}

export default DaneFaktury
