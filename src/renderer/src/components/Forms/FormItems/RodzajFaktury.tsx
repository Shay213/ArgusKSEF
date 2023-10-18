import { useFormContext } from 'react-hook-form'
import { RodzajFaktury as ZRodzajFaktury } from '@renderer/lib/zodSchemas'
import { FormField } from '@renderer/components/ui/form'
import SelectFormItem from '../FormItems-base/SelectFormItem'

interface Props {
  formFieldNamePrefix?: string
  optional?: boolean
}

const RodzajFaktury = ({ formFieldNamePrefix, optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={`${formFieldNamePrefix ?? ''}RodzajFaktury`}
      render={({ field }): JSX.Element => (
        <SelectFormItem
          field={field}
          items={[...ZRodzajFaktury]}
          label="RodzajFaktury"
          optional={optional}
          placeholder="Wybierz RodzajFaktury"
          tooltipMessage="Rodzaj faktury

          Podaje się:
          - „VAT” - w przypadku faktury podstawowej,
          - „KOR” - w przypadku faktury korygującej,
          - „ZAL” - w przypadku faktury dokumentującej
          otrzymanie zapłaty lub jej części przed dokonaniem
          czynności oraz w przypadku faktury wystawionej w
          związku z art. 106f ust. 4 ustawy,
          - „ROZ” - w przypadku faktury wystawionej w związku z
          art. 106f ust. 3 ustawy,
          - „UPR” - w przypadku faktury, o której mowa w art. 106e
          ust. 5 pkt 3 ustawy,
          - „KOR_ZAL” - w przypadku faktury korygującej fakturę
          dokumentującą otrzymanie zapłaty lub jej części przed
          dokonaniem czynności oraz fakturę wystawioną w
          związku z art. 106f ust. 4 ustawy,
          - „KOR_ROZ” - w przypadku faktury korygującej fakturę
          wystawioną w związku z art. 106f ust. 3 ustawy.

          W przypadku wystawienia faktury korygującej do faktury
          uproszczonej, o której mowa w art. 106e ust. 5 pkt 3
          ustawy należy wskazać „KOR”.

          Z dniem 1 września 2023 r. wchodzi w życie art. 106b ust.
          1a ustawy, w myśl którego podatnik nie jest obowiązany
          do wystawienia faktury, o której mowa w art. 106b ust. 1
          pkt 4 ustawy, jeżeli całość lub część zapłaty, o której
          mowa w tym przepisie, otrzymał w tym samym miesiącu,
          w którym dokonał czynności, na poczet których otrzymał
          całość lub część tej zapłaty.

          W przypadku niewystawienia przez podatnika faktury, o
          której mowa w art. 106b ust. 1 pkt 4 ustawy, z powodów
          określonych w art. 106b ust. 1a, wystawiona przez
          podatnika po wydaniu towaru lub wykonaniu usługi
          faktura, zawierająca dodatkowo elementy wskazane w
          art. 106e ust. 1a ustawy, powinna posiadać oznaczenie
          „ROZ”."
        />
      )}
    />
  )
}

export default RodzajFaktury
