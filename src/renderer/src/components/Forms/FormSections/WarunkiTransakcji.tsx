import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import Umowy from './Umowy'
import Zamowienia from './Zamowienia'
import NrPartiiTowaru from './NrPartiiTowaru'
import { KodWaluty } from '@renderer/lib/zodSchemas'
import Transport from './Transport'
import FormSection from '../FormItems-base/FormSection'
import BasicFormItem from '../FormItems-base/BasicFormItem'
import PopoverSearchFormItem from '../FormItems-base/PopoverSearchFormItem'
import SelectFormItem from '../FormItems-base/SelectFormItem'

interface Props {
  optional?: boolean
}

const WarunkiTransakcji = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormSection
      title="WarunkiTransakcji"
      size="lg"
      optional={optional}
      tooltipMessage="Element zawierający dane dotyczące warunków
      transakcji, o ile występują [element fakultatywny]"
    >
      <div className="flex flex-col gap-2">
        <Umowy formFieldNamePrefix="WarunkiTransakcji." optional />
        <Zamowienia formFieldNamePrefix="WarunkiTransakcji." optional />
        <NrPartiiTowaru formFieldNamePrefix="WarunkiTransakcji." optional />
        <FormField
          control={form.control}
          name={`WarunkiTransakcji.WarunkiDostawy`}
          render={({ field }): JSX.Element => (
            <BasicFormItem
              field={field}
              label="WarunkiDostawy"
              tooltipMessage="Warunki dostawy towarów [pole fakultatywne]

              Podaje się warunki dostawy towarów, w przypadku, gdy
              pomiędzy stronami transakcji istnieją umowne warunki
              dostawy, tzw. Incoterms (opis słowny lub skrót).

              Przykład: „DDP”
              "
            />
          )}
        />
        <FormSection title="Waluta umowna i kurs umowny" size="default" optional>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name={`WarunkiTransakcji.KursUmowny`}
              render={({ field }): JSX.Element => (
                <BasicFormItem
                  field={field}
                  label="KursUmowny"
                  tooltipMessage="Kurs umowny - w przypadkach, gdy na fakturze znajduje
              się informacja o kursie, po którym zostały przeliczone
              kwoty wykazane na fakturze w złotych. Pole nie dotyczy
              przypadków, o których mowa w dziale VI ustawy.

              Pole KursUmowny dotyczy w szczególności sytuacji, gdy
              strony transakcji ustaliły, że cena towaru wyniesie np.
              100 EUR, płatność nastąpi w PLN, a umowny kurs euro
              na cele tej transakcji jest równy 4,50 PLN. Finalnie
              nabywca płaci więc sprzedawcy 450 PLN i faktura
              również jest wystawiona w PLN (z ewentualną
              informacją o kursie umownym i walucie umownej).

              Sekwencja składająca się z pól KursUmowny oraz
              WalutaUmowna ma charakter fakultatywny. Jeżeli
              jednak podatnik zdecyduje się ją wypełnić, wówczas
              uzupełnia oba ww. pola.
              "
                />
              )}
            />
            <FormField
              control={form.control}
              name={`WarunkiTransakcji.WalutaUmowna`}
              render={({ field }): JSX.Element => (
                <PopoverSearchFormItem
                  field={field}
                  handleSelect={(value): void =>
                    form.setValue(`WarunkiTransakcji.WalutaUmowna`, value.toUpperCase())
                  }
                  items={[...KodWaluty]}
                  label="WalutaUmowna"
                  placeholder="Wybierz WalutaUmowna"
                  tooltipMessage="Waluta umowna - trzyliterowy kod waluty (ISO4217) w
              przypadkach, gdy na fakturze znajduje się informacja o
              kursie, po którym zostały przeliczone kwoty wykazane
              na fakturze w złotych. Pole nie dotyczy przypadków, o
              których mowa w dziale VI ustawy.

              Pole WalutaUmowna dotyczy w szczególności sytuacji,
              gdy strony transakcji ustaliły, że cena towaru wyniesie
              np. 100 EUR, płatność nastąpi w PLN, a umowny kurs
              euro na cele tej transakcji jest równy 4,50 PLN. Finalnie
              nabywca płaci więc sprzedawcy 450 PLN i faktura
              również jest wystawiona w PLN (z ewentualną
              informacją o kursie umownym i walucie umownej).

              Sekwencja składająca się z pól KursUmowny oraz
              WalutaUmowna ma charakter fakultatywny. Jeżeli
              jednak podatnik zdecyduje się ją wypełnić, wówczas
              uzupełnia oba ww. pola.

              W polu WalutaUmowna nigdy nie powinna wystąpić
              waluta polska (PLN)."
                />
              )}
            />
          </div>
        </FormSection>

        <Transport formFieldNamePrefix="WarunkiTransakcji." />
        <FormField
          control={form.control}
          name={`WarunkiTransakcji.PodmiotPosredniczacy`}
          render={({ field }): JSX.Element => (
            <SelectFormItem
              field={field}
              items={['1']}
              label="PodmiotPosredniczacy"
              placeholder="Wybierz PodmiotPosredniczacy"
              tooltipMessage={`Podmiot pośredniczący, o którym mowa w art. 22 ust.
              2d ustawy [pole fakultatywne]
              Podaje się wartość „1" w przypadku zawarcia na
              fakturze informacji, że dostawy dokonuje podmiot, o
              którym mowa w art. 22 ust. 2d ustawy. Pole dotyczy
              przypadku, w którym, podmiot uczestniczy w transakcji
              łańcuchowej, innej niż procedura trójstronna
              uproszczona, o której mowa w art. 135 ust. 1 pkt 4
              ustawy.`}
            />
          )}
        />
      </div>
    </FormSection>
  )
}

export default WarunkiTransakcji
