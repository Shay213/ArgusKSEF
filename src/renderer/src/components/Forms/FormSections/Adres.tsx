import { FormField } from '@renderer/components/ui/form'
import { useFormContext } from 'react-hook-form'
import FormSection from '../FormItems-base/FormSection'
import KodKraju from '../FormItems/KodKraju'
import TextareaFormItem from '../FormItems-base/TextareaFormItem'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  formFieldNamePrefix?: string
  heading: string
  optional?: boolean
  headingSize?: 'xs' | 'sm' | 'default' | 'lg'
  children?: React.ReactNode
}

const Adres = ({
  formFieldNamePrefix,
  heading,
  optional,
  headingSize,
  children
}: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormSection title={heading} size={headingSize ?? 'lg'} optional={optional}>
      <div className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name={`${formFieldNamePrefix ?? ''}KodKraju`}
          render={({ field }): JSX.Element => (
            <KodKraju
              field={field}
              handleSelect={(value): void =>
                form.setValue(`${formFieldNamePrefix ?? ''}KodKraju`, value.toUpperCase())
              }
            />
          )}
        />
        <FormField
          control={form.control}
          name={`${formFieldNamePrefix ?? ''}AdresL1`}
          render={({ field }): JSX.Element => (
            <TextareaFormItem
              field={field}
              label="AdresL1"
              tooltipMessage="Adres podatnika – linia pierwsza

                    Przykład wypełnienia:
                    ul. Błękitna 14, 11-111 Warszawa"
            />
          )}
        />
        <FormField
          control={form.control}
          name={`${formFieldNamePrefix ?? ''}AdresL2`}
          render={({ field }): JSX.Element => (
            <TextareaFormItem
              field={field}
              label="AdresL2"
              optional
              tooltipMessage="Adres podatnika – linia druga [pole fakultatywne]

                    Pole AdresL2 można wykorzystać np. w sytuacji, gdy
                    adres podatnika nie mieści się w polu AdresL1 lub w celu
                    zwiększenia czytelności danych (np. ulica i nr domu w
                    polu AdresL1, a kod pocztowy i miejscowość w AdresL2)."
            />
          )}
        />
        <FormField
          control={form.control}
          name={`${formFieldNamePrefix ?? ''}GLN`}
          render={({ field }): JSX.Element => (
            <BasicFormItem
              field={field}
              label="GLN"
              optional
              tooltipMessage="Globalny Numer Lokalizacyjny [pole fakultatywne]
                    GLN jest to numer umożliwiający m.in. zidentyfikowanie
                    jednostek fizycznych lub funkcjonalnych w obrębie firmy.

                    Przykładowo w elemencie Adres dla Podmiot1, numer
                    GLN może oznaczać fizyczną lokalizację danego obiektu,
                    (np. budynku siedziby podatnika, piętra, oddziału firmy)"
            />
          )}
        />
      </div>
      {children}
    </FormSection>
  )
}

export default Adres
