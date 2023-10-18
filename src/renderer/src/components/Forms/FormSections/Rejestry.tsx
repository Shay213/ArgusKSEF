import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from '@renderer/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { FormField } from '@renderer/components/ui/form'
import FormSection from '../FormItems-base/FormSection'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
}

const defaultRejestryValues = {
  PelnaNazwa: '',
  KRS: '',
  REGON: '',
  BDO: ''
}

const Rejestry = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: 'Rejestry',
    control: form.control
  })
  return (
    <FormSection
      title="Rejestry"
      size="lg"
      optional={optional}
      tooltipMessage="Element zawierający numery podmiotu lub grupy
      podmiotów w innych rejestrach i bazach danych
      [element fakultatywny]
      Maksymalna ilość wystąpień: 100"
    >
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <FormSection key={field.id} title={`Rejestr ${index + 1}`} size="default">
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name={`Rejestry.${index}.PelnaNazwa`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="PelnaNazwa"
                    optional
                    tooltipMessage="Pełna nazwa podmiotu, dla którego wskazano numer w
                    polu KRS/REGON/BDO [pole fakultatywne]"
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`Rejestry.${index}.KRS`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="KRS"
                    optional
                    tooltipMessage="Numer Krajowego Rejestru Sądowego [pole
                      fakultatywne]

                      Krajowy Rejestr Sądowy jest scentralizowaną,
                      informatyczną bazą danych składającą się z trzech
                      osobnych rejestrów:
                      - rejestru przedsiębiorców,
                      - rejestru stowarzyszeń, innych organizacji społecznych i
                      zawodowych, fundacji oraz publicznych zakładów opieki
                      zdrowotnej,
                      - rejestru dłużników niewypłacalnych."
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`Rejestry.${index}.REGON`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="REGON"
                    optional
                    tooltipMessage="Numer REGON [pole fakultatywne]

                    Niepowtarzalny numer nadawany podmiotom
                    gospodarki narodowej i jednostkom lokalnym tych
                    podmiotów w krajowym rejestrze urzędowym
                    podmiotów gospodarki narodowej REGON, niemający
                    ukrytego lub jawnego charakteru znaczącego,
                    określającego cechy podmiotu."
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`Rejestry.${index}.BDO`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="BDO"
                    optional
                    tooltipMessage="Numer rejestrowy w Bazie Danych o Odpadach [pole
                      fakultatywne]

                      Rejestr BDO jest to rejestr podmiotów wprowadzających
                      na rynek produkty, produkty w opakowaniach i
                      gospodarujących odpadami."
                  />
                )}
              />
            </div>
            <Button
              className="mt-2"
              type="button"
              onClick={(): void => remove(index)}
              variant="destructive"
            >
              Usuń Rejestr {index + 1} <Trash2 className="w-4 h-4 ml-2" />
            </Button>
          </FormSection>
        ))}
        <div>
          <Button type="button" onClick={(): void => append(defaultRejestryValues)}>
            Dodaj Rejestr <Plus className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </FormSection>
  )
}

export default Rejestry
