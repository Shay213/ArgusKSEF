import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import { GTU, OznaczenieProcedury, StawkaPodatku } from '@renderer/lib/zodSchemas'
import defaultZamowienieWierszValues from '@renderer/data/defaultFormValues/defaultZamowienieWierszValues'
import FormSection from '../FormItems-base/FormSection'
import BasicFormItem from '../FormItems-base/BasicFormItem'
import TableFormItem from '../FormItems-base/TableFormItem'

interface Props {
  optional?: boolean
}

const Zamowienie = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormSection
      title="Zamowienie"
      size="lg"
      optional={optional}
      tooltipMessage="Element zawierający dane dotyczące zamówienia lub
      umowy, o których mowa w art. 106f ust. 1 pkt 4 ustawy
      (dla faktur zaliczkowych) w walucie, w której wystawiono
      fakturę zaliczkową [element opcjonalny]"
    >
      <div className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name={`Zamowienie.WartoscZamowienia`}
          render={({ field }): JSX.Element => (
            <BasicFormItem
              field={field}
              label="WartoscZamowienia"
              tooltipMessage="Wartość zamówienia lub umowy z uwzględnieniem
              kwoty podatku

              Podaje się łączną wartość pól P_11NettoZ oraz P_11VatZ
              (obejmującą wszystkie wiersze zamówienia)."
            />
          )}
        />
        <TableFormItem
          fieldName="Zamowienie.ZamowienieWiersz"
          addButtonLabel="Dodaj ZamowienieWiersz"
          initialState={defaultZamowienieWierszValues}
          initialVisibleCols={[
            'P_7Z',
            'P_8AZ',
            'P_8BZ',
            'P_9AZ',
            'P_11',
            'P_11NettoZ',
            'P_11VatZ',
            'P_12Z'
          ]}
          cellInfo={{
            NrWierszaZam: {
              label: 'NrWierszaZam',
              asLp: true
            },
            UU_IDZ: {
              label: 'UU_IDZ',
              type: 'basic',
              tooltip: `Uniwersalny unikalny numer wiersza zamówienia lub
              umowy [pole fakultatywne]

              Pole tekstowe zawierające uniwersalny, unikalny
              identyfikator danych, umożliwiający jednoznaczne
              zidentyfikowanie wiersza zamówienia lub umowy.
              Pożądaną unikalnością pola UU_IDZ jest unikalność w
              skali danego podatnika lub danego systemu
              wykorzystywanego przez danego podatnika.`
            },
            P_7Z: {
              label: 'P_7Z',
              type: 'basic',
              cellWidth: 250,
              tooltip: `Nazwa (rodzaj) towaru lub usługi [pole opcjonalne]

              Podaje się nazwę (rodzaj) towaru lub usługi będących
              przedmiotem zamówienia lub umowy.`
            },
            IndeksZ: {
              label: 'IndeksZ',
              type: 'basic',
              cellWidth: 250,
              tooltip: `Pole przeznaczone do wpisania wewnętrznego kodu
              zamawianego towaru lub usługi nadanego przez
              podatnika albo dodatkowego opisu zamawianego towaru
              lub usługi [pole fakultatywne]

              Maksymalna ilość znaków: 50`
            },
            GTINZ: {
              label: 'GTINZ',
              type: 'basic',
              tooltip: `Globalny Numer Jednostki Handlowej [pole
                fakultatywne]

                GTIN to numer pozwalający na identyfikację towarów i
                usług na całym świecie, jest to cyfrowy odpowiednik
                kodu EAN.

                Podaje się cyfrowy kod GTIN towaru lub usługi, będących
                przedmiotem zamówienia lub umowy.`
            },
            PKWiUZ: {
              label: 'PKWiUZ',
              type: 'basic',
              tooltip: `Symbol Polskiej Klasyfikacji Wyrobów i Usług [pole
                fakultatywne]

                Obecnie, na potrzeby podatku od towarów i usług,
                stosuje się Polską Klasyfikację Wyrobów i Usług z 2015 r`
            },
            CNZ: {
              label: 'CNZ',
              type: 'basic',
              tooltip: `Symbol Nomenklatury Scalonej [pole fakultatywne]
              Podaje się symbol Nomenklatury Scalonej CN.`
            },
            PKOBZ: {
              label: 'PKOBZ',
              type: 'basic',
              tooltip: `Symbol Polskiej Klasyfikacji Obiektów Budowlanych [pole
                fakultatywne]

                Podaje się symbol Polskiej Klasyfikacji Obiektów
                Budowlanych.`
            },
            P_8AZ: {
              label: 'P_8AZ',
              type: 'basic',
              tooltip: `Miara zamówionego towaru lub zakres usługi [poleopcjonalne]`
            },
            P_8BZ: {
              label: 'P_8BZ',
              type: 'basic',
              tooltip: `Ilość zamówionego towaru lub zakres usługi [pole opcjonalne]`
            },
            P_9AZ: {
              label: 'P_9AZ',
              type: 'basic',
              tooltip: `Cena jednostkowa netto zamówionego towaru lub usługi
              [pole fakultatywne]

              Maksymalna liczba miejsc po kropce: 8`
            },
            P_11NettoZ: {
              label: 'P_11NettoZ',
              type: 'basic',
              tooltip: `Wartość zamówionego towaru lub usługi bez kwoty
              podatku [pole opcjonalne]`
            },
            P_11VatZ: {
              label: 'P_11VatZ',
              type: 'basic',
              tooltip: `Kwota podatku od zamówionego towaru lub usługi [pole opcjonalne]`
            },
            P_12Z: {
              label: 'P_12Z',
              type: 'select',
              cellWidth: 50,
              items: [...StawkaPodatku],
              tooltip: `Stawka podatku: 23, 22, 8, 7, 5, 4, 3, 0, zw, oo, np [pole
                opcjonalne]

                Podaje się stawkę podatku właściwą dla zamawianego
                towaru lub usługi.`
            },
            P_12Z_XII: {
              label: 'P_12Z_XII',
              type: 'basic',
              inputType: 'number',
              tooltip: `Stawka podatku od wartości dodanej w przypadku, o
              którym mowa w dziale XII w rozdziale 6a ustawy [pole
              opcjonalne]

              Podaje się stawkę podatku od wartości dodanej właściwą
              dla przedmiotu zamówienia, w przypadku wystawienia
              faktury zaliczkowej przez podatnika zidentyfikowanego
              na terytorium kraju do procedury unijnej OSS.
              Na stronie Komisji Europejskiej dostępna jest Baza
              stawek podatkowych w innych krajach UE.`
            },
            P_12Z_Zal_15: {
              label: 'P_12Z_Zal_15',
              type: 'select',
              items: ['1'],
              tooltip: `Znacznik dla towaru lub usługi wymienionych w
              załączniku nr 15 do ustawy [pole fakultatywne]

              Podaje się wartość „1” w przypadku, gdy dana pozycja
              zamówienia lub umowy dotyczy towaru lub usługi
              wymienionej w załączniku nr 15 do ustawy (niezależnie
              czy zaliczka podlega obowiązkowemu mechanizmowi
              podzielonej płatności).`
            },
            GTUZ: {
              label: 'GTUZ',
              type: 'select',
              items: [...GTU],
              tooltip: `Oznaczenie dotyczące dostawy towarów i świadczenia
              usług, będących przedmiotem zamówienia lub umowy
              [pole fakultatywne]

              Podaje się:
              - „GTU_01” - w przypadku dostawy towarów, o których
              mowa w § 10 ust. 3 pkt 1 lit. a rozporządzenia w sprawie
              JPK_VAT z deklaracją.

              Symbol „GTU_01” oznacza wiersz zamówienia lub
              umowy dotyczący dostawy napojów alkoholowych o
              zawartości alkoholu powyżej 1,2%, piwa oraz napojów
              alkoholowych będących mieszaniną piwa i napojów
              bezalkoholowych, w których zawartość alkoholu
              przekracza 0,5% (CN od 2203 do 2208).

              - „GTU_02” - w przypadku dostawy towarów, o których
              mowa w § 10 ust. 3 pkt 1 lit. b rozporządzenia w sprawie
              JPK_VAT z deklaracją.

              Symbol „GTU_02” oznacza wiersz zamówienia lub
              umowy dotyczący dostawy towarów, o których mowa w
              art. 103 ust. 5aa ustawy.

              - „GTU_03” - w przypadku dostawy towarów, o których
              mowa w § 10 ust. 3 pkt 1 lit. c rozporządzenia w sprawie
              JPK_VAT z deklaracją.

              Symbol „GTU_03” oznacza wiersz zamówienia lub
              umowy dotyczący dostawy olejów opałowych nieujętych
              w § 10 ust. 3 pkt 1 lit. b, olejów smarowych i pozostałych
              olejów (CN od 2710 19 71 do 2710 19 83 i CN od 2710 19
              87 do 2710 19 99, z wyłączeniem smarów plastycznych
              zaliczonych do kodu CN 2710 19 99), olejów smarowych
              (CN 2710 20 90) oraz preparatów smarowych (CN 3403, z
                wyłączeniem smarów plastycznych objętych tą pozycją).

                - „GTU_04” - w przypadku dostawy towarów, o których
                mowa w § 10 ust. 3 pkt 1 lit. d rozporządzenia w sprawie
                JPK_VAT z deklaracją.

                Symbol „GTU_04” oznacza wiersz zamówienia lub
                umowy dotyczący dostawy wyrobów tytoniowych, suszu
                tytoniowego, płynu do papierosów elektronicznych i
                wyrobów nowatorskich, w rozumieniu przepisów o
                podatku akcyzowym.

                - „GTU_05” - w przypadku dostawy towarów, o których
                mowa w § 10 ust. 3 pkt 1 lit. e rozporządzenia w sprawie
                JPK_VAT z deklaracją.

                Symbol „GTU_05” oznacza wiersz zamówienia lub
                umowy dotyczący dostawy odpadów - wyłącznie
                określonych w poz. 79-91 załącznika nr 15 do ustawy.

                - „GTU_06” - w przypadku dostawy towarów, o których
                mowa w § 10 ust. 3 pkt 1 lit. f rozporządzenia w sprawie
                JPK_VAT z deklaracją.

                Symbol „GTU_06” oznacza wiersz zamówienia lub
                umowy dotyczący dostawy urządzeń elektronicznych
                oraz części i materiałów do nich, wyłącznie określonych
                w poz. 7, 8, 59-63, 65, 66, 69 i 94-96 załącznika nr 15 do
                ustawy, a także folii typu stretch określonej w poz. 9 tego
                załącznika.

                - „GTU_07” - w przypadku dostawy towarów, o których
                mowa w § 10 ust. 3 pkt 1 lit. g rozporządzenia w sprawie
                JPK_VAT z deklaracją.

                Symbol „GTU_07” oznacza wiersz zamówienia lub
                umowy dotyczący dostawy pojazdów oraz części (CN od
                8701 do 8708).

                - „GTU_08” - w przypadku dostawy towarów, o których
                mowa w § 10 ust. 3 pkt 1 lit. h rozporządzenia w sprawie
                JPK_VAT z deklaracją.

                Symbol „GTU_08” oznacza wiersz zamówienia lub
                umowy dotyczący dostawy metali szlachetnych oraz
                nieszlachetnych - wyłącznie określonych w poz. 1 i 1a
                załącznika nr 12 do ustawy oraz w poz. 12-25, 33-40, 45,
                46, 56 i 78 załącznika nr 15 do ustawy.

                - „GTU_09” - w przypadku dostawy towarów, o których
                mowa w § 10 ust. 3 pkt 1 lit. i rozporządzenia w sprawie
                JPK_VAT z deklaracją.

                Symbol „GTU_09” oznacza wiersz zamówienia lub
                umowy dotyczący dostawy produktów leczniczych,
                środków spożywczych specjalnego przeznaczenia
                żywieniowego oraz wyrobów medycznych - wyłącznie
                objętych obowiązkiem zgłoszenia, o którym mowa w art.
                37av ust. 1 ustawy z dnia 6 września 2001 r. - Prawo
                farmaceutyczne13.

                - „GTU_10” - w przypadku dostawy towarów, o których
                mowa w § 10 ust. 3 pkt 1 lit. j rozporządzenia w sprawie
                JPK_VAT z deklaracją.

                Symbol „GTU_10” oznacza wiersz zamówienia lub
                umowy dotyczący dostawy budynków, budowli i gruntów
                oraz ich części i udziałów w prawie własności, w tym
                również zbycia praw, o których mowa w art. 7 ust. 1
                ustawy.

                - „GTU_11” - w przypadku świadczenia usług, o których
                mowa w § 10 ust. 3 pkt 2 lit. a rozporządzenia w sprawie
                JPK_VAT z deklaracją.

                Symbol „GTU_11” oznacza wiersz zamówienia lub
                umowy dotyczący świadczenia usług w zakresie
                przenoszenia uprawnień do emisji gazów cieplarnianych,
                o których mowa w ustawie z dnia 12 czerwca 2015 r. o
                systemie handlu uprawnieniami do emisji gazów
                cieplarnianych14.

                - „GTU_12” - w przypadku świadczenia usług, o których
                mowa w § 10 ust. 3 pkt 2 lit. b rozporządzenia w sprawie
                JPK_VAT z deklaracją.

                Symbol „GTU_12” oznacza wiersz zamówienia lub
                umowy dotyczący świadczenia usług o charakterze
                niematerialnym - wyłącznie: doradczych, w tym
                doradztwa prawnego i podatkowego oraz doradztwa
                związanego z zarządzaniem (PKWiU 62.02.1, 62.02.2,
                  66.19.91, 69.20.3, 70.22.11, 70.22.12, 70.22.13,
                  70.22.14, 70.22.15, 70.22.16, 70.22.3, 71.11.24,
                  71.11.42, 71.12.11, 71.12.31, 74.90.13, 74.90.15,
                  74.90.19), w zakresie rachunkowości i audytu
                  finansowego (PKWiU 69.20.1, 69.20.2), prawnych
                  (PKWiU 69.1), zarządczych (PKWiU 62.03, 63.11.12,
                  66.11.19, 66.30, 68.32, 69.20.4, 70.22.17, 70.22.2,
                  90.02.19.1), firm centralnych (PKWiU 70.1),
                  marketingowych lub reklamowych (PKWiU 73.1),
                  badania rynku i opinii publicznej (PKWiU 73.2), w zakresie
                  badań naukowych i prac rozwojowych (PKWiU 72) oraz w
                  zakresie pozaszkolnych form edukacji (PKWiU 85.5).

                  - „GTU_13” - w przypadku świadczenia usług, o których
                  mowa w § 10 ust. 3 pkt 2 lit. c rozporządzenia w sprawie
                  JPK_VAT z deklaracją.

                  Symbol „GTU_13” oznacza wiersz zamówienia lub
                  umowy dotyczący świadczenia usług transportowych i
                  gospodarki magazynowej (PKWiU 49.4, 52.1).`
            },
            ProceduraZ: {
              label: 'ProceduraZ',
              type: 'select',
              items: [...OznaczenieProcedury],
              tooltip: `Oznaczenie procedury dotyczącej towaru lub usługi
              będących przedmiotem danego zamówienia lub umowy
              [pole fakultatywne]

              Podaje się:
              - „WSTO_EE” – w przypadku procedury, o której mowa w
              § 10 ust. 4 pkt 2a rozporządzenia w sprawie JPK_VAT z
              deklaracją.

              Symbol „WSTO_EE” oznacza wiersz zamówienia lub
              umowy dotyczący wewnątrzwspólnotowej sprzedaży na
              odległość towarów, które w momencie rozpoczęcia ich
              wysyłki lub transportu znajdują się na terytorium kraju,
              oraz świadczenia usług telekomunikacyjnych,
              nadawczych i elektronicznych, o których mowa w art. 28k
              ustawy, na rzecz podmiotów niebędących podatnikami,
              posiadających siedzibę, stałe miejsce zamieszkania lub
              miejsce pobytu na terytorium państwa członkowskiego
              innym niż terytorium kraju.

              Obowiązkowym KSeF od 1 lipca 2024 r. nie są objęte
              transakcje, w których nabywcą jest osoba fizyczna
              nieprowadząca działalności gospodarczej.

              - „IED” - w przypadku procedury, o której mowa w § 10
              ust. 4 pkt 2b rozporządzenia w sprawie JPK_VAT z
              deklaracją.

              Symbol „IED” oznacza wiersz zamówienia lub umowy
              dotyczący dostawy towarów, o której mowa w art. 7a ust.
              1 i 2 ustawy, dokonanej przez podatnika ułatwiającego tę
              dostawę, który nie korzysta z procedury szczególnej, o
              której mowa w dziale XII w rozdziale 6a lub 9 ustawy lub
              w odpowiadających im regulacjach, dla której miejscem
              dostawy jest terytorium kraju.

              Obowiązkowym KSeF od 1 lipca 2024 r. nie są objęte
              transakcje, w których nabywcą jest osoba fizyczna
              nieprowadząca działalności gospodarczej.

              - „TT_D” – w przypadku procedury, o której mowa w § 10
              ust. 4 pkt 5 rozporządzenia w sprawie JPK_VAT z
              deklaracją.

              Symbol „TT_D” oznacza wiersz zamówienia lub umowy
              dotyczący dostawy towarów poza terytorium kraju
              dokonanej przez drugiego w kolejności podatnika VAT w
              ramach transakcji trójstronnej w procedurze
              uproszczonej, o której mowa w dziale XII rozdział 8
              ustawy.

              - „B_SPV” - w przypadku procedury, o której mowa w §
              10 ust. 4 pkt 10 rozporządzenia w sprawie JPK_VAT z
              deklaracją.

              Symbol „B_SPV” oznacza wiersz zamówienia lub umowy
              dotyczący transferu bonu jednego przeznaczenia
              dokonanego przez podatnika działającego we własnym
              imieniu, opodatkowanego zgodnie z art. 8a ust. 1 ustawy.

              - „B_SPV_DOSTAWA” - w przypadku procedury, o której
              mowa w § 10 ust. 4 pkt 11 rozporządzenia w sprawie
              JPK_VAT z deklaracją.

              Symbol „B_SPV_DOSTAWA” oznacza wiersz zamówienia
              lub umowy dotyczący dostawy towarów oraz
              świadczenia usług, których dotyczy bon jednego
              przeznaczenia na rzecz podatnika, który wyemitował bon
              zgodnie z art. 8a ust. 4 ustawy.

              - „B_MPV_PROWIZJA” – w przypadku procedury, o której
              mowa w § 10 ust. 4 pkt 12 rozporządzenia w sprawie
              JPK_VAT z deklaracją.

              Symbol „B_MPV_PROWIZJA” oznacza wiersz zamówienia
              lub umowy dotyczący świadczenia usług pośrednictwa
              oraz innych usług dotyczących transferu bonu różnego
              przeznaczenia, opodatkowanych zgodnie z art. 8b ust. 2
              ustawy.`
            },
            KwotaAkcyzyZ: {
              label: 'KwotaAkcyzyZ',
              type: 'basic',
              tooltip: `Kwota podatku akcyzowego zawarta w cenie towaru
              [pole fakultatywne]`
            },
            StanPrzedZ: {
              label: 'StanPrzedZ',
              type: 'select',
              items: ['1'],
              tooltip: `Znacznik stanu przed korektą [pole fakultatywne]

              Podaje się „1” w przypadku faktury korygującej fakturę
              dokumentującą otrzymanie zapłaty lub jej części przed
              dokonaniem czynności oraz fakturę wystawioną w
              związku z art. 106f ust. 4 ustawy, w przypadku, gdy
              korekta dotyczy danych wykazanych w pozycjach
              zamówienia i jest dokonywana w sposób polegający na
              wykazaniu danych przed korektą i po korekcie jako
              osobnych wierszy z odrębną numeracją oraz w przypadku
              potwierdzania braku zmiany wartości danej pozycji.`
            }
          }}
        />
      </div>
    </FormSection>
  )
}

export default Zamowienie
