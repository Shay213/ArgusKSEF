import defaultFaWierszValues from '@renderer/data/defaultFormValues/defaultFaWierszValues'
import { GTU, OznaczenieProcedury, StawkaPodatku } from '@renderer/lib/zodSchemas'
import FormSection from '../FormItems-base/FormSection'
import TableFormItem from '../FormItems-base/TableFormItem'

interface Props {
  optional?: boolean
  children?: React.ReactNode
}

const FaWiersz = ({ optional, children }: Props): JSX.Element => {
  return (
    <FormSection
      title="FaWiersz"
      size="lg"
      optional={optional}
      tooltipMessage="Element zawierający szczegółowe pozycje faktury w
      walucie, w której wystawiono fakturę [element opcjonalny]"
    >
      <TableFormItem
        fieldName="FaWiersz"
        addButtonLabel="Dodaj FaWiersz"
        initialVisibleCols={['P_7', 'P_8A', 'P_8B', 'P_9A', 'P_11', 'P_12']}
        initialState={defaultFaWierszValues}
        cellInfo={{
          NrWierszaFa: {
            label: 'NrWierszaFa',
            asLp: true
          },
          UU_ID: {
            label: 'UU_ID',
            type: 'basic',
            tooltip: `Uniwersalny unikalny numer wiersza faktury [pole
              fakultatywne]

              Pole tekstowe zawierające uniwersalny, unikalny
              identyfikator danych, umożliwiający jednoznaczne
              zidentyfikowanie wiersza faktury. Pożądaną unikalnością
              pola UU_ID jest unikalność w skali danego podatnika lub
              danego systemu wykorzystywanego przez danego
              podatnika`
          },
          P_6A: {
            label: 'P_6A',
            type: 'calendar',
            cellWidth: 130,
            tooltip: `Data dokonania lub zakończenia dostawy towarów lub
            wykonania usługi lub data otrzymania zapłaty, o której
            mowa w art. 106b ust. 1 pkt 4 ustawy, o ile taka data jest
            określona i różni się od daty wystawienia faktury [pole
            opcjonalne]

            Pole wypełnia się w przypadku, gdy dla poszczególnych
            pozycji faktury występują różne daty. W przeciwnym
            przypadku pole pozostaje puste.

            W przypadku, gdy dla wszystkich pozycji faktury data jest
            wspólna – wypełnia się pole P_6 (element Fa)`
          },
          P_7: {
            label: 'P_7',
            type: 'basic',
            cellWidth: 250,
            tooltip: `Nazwa (rodzaj) towaru lub usługi [pole opcjonalne]

            Pole nie jest wymagane wyłącznie dla przypadku
            określonego w art 106j ust. 3 pkt 2 ustawy, tj., gdy
            podatnik udziela opustu lub obniżki ceny i wystawia
            fakturę korygującą, dotyczącą wszystkich dostaw
            towarów i świadczenia usług na rzecz jednego odbiorcy
            w danym okresie`
          },
          Indeks: {
            label: 'Indeks',
            type: 'basic',
            cellWidth: 250,
            tooltip: `Pole przeznaczone do wpisania wewnętrznego kodu
            towaru lub usługi, nadanego przez podatnika albo
            dodatkowego opisu towaru lub usługi [pole fakultatywne]

            Maksymalna ilość znaków: 50`
          },
          GTIN: {
            label: 'GTIN',
            type: 'basic',
            tooltip: `Globalny Numer Jednostki Handlowej [pole
              fakultatywne]

              Podaje się cyfrowy kod GTIN towaru lub usługi, których
              sprzedaż jest dokumentowana fakturą. GTIN to numer pozwalający na
              identyfikację towarów i usług na całym świecie, jest to cyfrowy odpowiednik
              kodu EAN`
          },
          PKWiU: {
            label: 'PKWiU',
            type: 'basic',
            tooltip: `Symbol Polskiej Klasyfikacji Wyrobów i Usług [pole
              fakultatywne]

              Obecnie na potrzeby podatku od towarów i usług, stosuje
              się Polską Klasyfikację Wyrobów i Usług z 2015 r`
          },
          CN: {
            label: 'CN',
            type: 'basic',
            tooltip: `Symbol Nomenklatury Scalonej [pole fakultatywne]
            Podaje się symbol Nomenklatury Scalonej CN.`
          },
          PKOB: {
            label: 'PKOB',
            type: 'basic',
            tooltip: `Symbol Polskiej Klasyfikacji Obiektów Budowlanych [pole
              fakultatywne]
              Podaje się symbol Polskiej Klasyfikacji Obiektów
              Budowlanych.`
          },
          P_8A: {
            label: 'P_8A',
            type: 'basic',
            tooltip: `Miara dostarczonych towarów lub zakres wykonanych
            usług [pole opcjonalne]
            Pole nie jest wymagane dla przypadku określonego w art.
            106e ust. 5 pkt 3 ustawy (faktura uproszczona do 450 zł).`
          },
          P_8B: {
            label: 'P_8B',
            type: 'basic',
            tooltip: `Ilość (liczba) dostarczonych towarów lub zakres
            wykonanych usług [pole opcjonalne]
            Pole nie jest wymagane dla przypadku określonego w art.
            106e ust. 5 pkt 3 ustawy (faktura uproszczona do 450 zł)`
          },
          P_9A: {
            label: 'P_9A',
            type: 'basic',
            tooltip: `Cena jednostkowa towaru lub usługi bez kwoty podatku
            (cena jednostkowa netto) [pole opcjonalne}

            Pole nie jest wymagane dla przypadków określonych w
            art. 106e ust. 2 i 3 oraz ust. 5 pkt 3 ustawy (tj. świadczenie
            usług turystyki, dla których podstawę opodatkowania
            stanowi marża zgodnie z art. 119 ustawy; dostawa
            towarów używanych, dzieł sztuki, przedmiotów
            kolekcjonerskich, antyków, dla których podstawę
            opodatkowania stanowi marża zgodnie z art. 120 ust. 4 i
            ust. 5 ustawy; faktura uproszczona do 450 zł).

            Maksymalna liczba miejsc po kropce: 8`
          },
          P_9B: {
            label: 'P_9B',
            type: 'basic',
            tooltip: `Cena wraz z kwotą podatku (cena jednostkowa brutto)
            [pole opcjonalne]

            Pole dotyczy przypadku zastosowania art. 106e ust. 7 i 8
            ustawy – tj. gdy kwotę podatku w odniesieniu do
            dostarczanych towarów lub świadczonych usług objętych
            daną stawką podatku podatnik oblicza według
            następującego wzoru:

            KP = WB x SP/100+SP
            gdzie
            KP - oznacza kwotę podatku,
            WB - oznacza wartość dostarczonych towarów lub
            wykonanych usług objętych stawką podatku,
            uwzględniającą kwotę podatku (wartość sprzedaży
            brutto),
            SP - oznacza stawkę podatku.

            Jeżeli podatnik oblicza kwotę podatku w powyższy
            sposób, zamiast ceny jednostkowej netto podatnik może
            wykazywać na fakturze cenę wraz z kwotą podatku (cenę
            jednostkową brutto), a zamiast wartości sprzedaży netto
            - wartość sprzedaży brutto.

            Maksymalna liczba miejsc po kropce: 8`
          },
          P_10: {
            label: 'P_10',
            type: 'basic',
            tooltip: `Kwoty wszelkich opustów lub obniżek cen, w tym w
            formie rabatu z tytułu wcześniejszej zapłaty, o ile nie
            zostały one uwzględnione w cenie jednostkowej netto, a
            w przypadku stosowania art. 106e ust. 7 ustawy w cenie
            jednostkowej brutto [pole opcjonalne]

            Pole nie jest wymagane dla przypadków określonych w
            art. 106e ust. 2 i 3 oraz ust. 5 pkt 1 ustawy, tj.:
            świadczenie usług turystyki, dla których podstawę
            opodatkowania stanowi marża zgodnie z art. 119 ustawy;
            dostawa towarów używanych, dzieł sztuki, przedmiotów
            kolekcjonerskich, antyków, dla których podstawę
            opodatkowania stanowi marża zgodnie z art. 120 ust. 4 i
            ust. 5 ustawy; dostawa towarów i świadczenie usług
            dokonywanych przez podatnika posiadającego na
            terytorium kraju siedzibę działalności gospodarczej lub
            stałe miejsce prowadzenia działalności gospodarczej, z
            którego dokonywane są te czynności, a w przypadku
            braku na terytorium kraju siedziby działalności
            gospodarczej oraz stałego miejsca prowadzenia
            działalności gospodarczej - posiadającego na terytorium
            kraju stałe miejsce zamieszkania albo zwykłe miejsce
            pobytu, z którego dokonywane są te czynności, w
            przypadku gdy miejscem świadczenia jest terytorium
            państwa członkowskiego inne niż terytorium kraju, a
            osobą zobowiązaną do zapłaty podatku od wartości
            dodanej jest nabywca towaru lub usługobiorca i faktura
            dokumentująca te czynności nie jest wystawiana przez
            tego nabywcę lub usługobiorcę w imieniu i na rzecz
            podatnika.


            Maksymalna liczba miejsc po kropce: 8`
          },
          P_11: {
            label: 'P_11',
            type: 'basic',
            tooltip: `Wartość dostarczonych towarów lub wykonanych usług,
            objętych transakcją, bez kwoty podatku (wartość
            sprzedaży netto) [pole opcjonalne]

            Pole nie jest wymagane dla przypadków określonych w
            art. 106e ust. 2 i 3 oraz ust. 5 pkt 3 ustawy, tj. świadczenie
            usług turystyki, dla których podstawę opodatkowania
            stanowi marża zgodnie z art. 119 ustawy; dostawa
            towarów używanych, dzieł sztuki, przedmiotów
            kolekcjonerskich, antyków, dla których podstawę
            opodatkowania stanowi marża zgodnie z art. 120 ust. 4 i
            ust. 5 ustawy; faktura uproszczona do 450 zł.`
          },
          P_11A: {
            label: 'P_11A',
            type: 'basic',
            tooltip: `Wartość sprzedaży brutto, w przypadku zastosowania
            art. 106e ust. 7 i 8 ustawy [pole opcjonalne]

            Pole dotyczy przypadku zastosowania art. 106e ust. 7 i 8
            ustawy – tj., gdy kwotę podatku w odniesieniu do
            dostarczanych towarów lub świadczonych usług objętych
            daną stawką podatku podatnik oblicza według
            następującego wzoru:

            KP = WB x SP/100+SP
            gdzie
            KP - oznacza kwotę podatku,
            WB - oznacza wartość dostarczonych towarów lub
            wykonanych usług objętych stawką podatku,
            uwzględniającą kwotę podatku (wartość sprzedaży
            brutto),
            SP - oznacza stawkę podatku.

            Jeżeli podatnik oblicza kwotę podatku w powyższy
            sposób, zamiast ceny jednostkowej netto podatnik może
            wykazywać na fakturze cenę wraz z kwotą podatku (cenę
            jednostkową brutto), a zamiast wartości sprzedaży netto
            - wartość sprzedaży brutto.`
          },
          P_11Vat: {
            label: 'P_11Vat',
            type: 'basic',
            tooltip: `Kwota podatku w przypadku, o którym mowa w art. 106e
            ust. 10 ustawy [pole opcjonalne]

            Zgodnie z art. 106e ust. 10 ustawy podatnik może określić
            na fakturze również kwoty podatku dotyczące wartości
            poszczególnych dostarczonych towarów i wykonanych
            usług wykazanych w tej fakturze; w tym przypadku łączna
            kwota podatku może być ustalona w wyniku
            podsumowania jednostkowych kwot podatku.`
          },
          P_12: {
            label: 'P_12',
            type: 'select',
            cellWidth: 50,
            items: [...StawkaPodatku],
            tooltip: `Stawka podatku: 23, 22, 8, 7, 5, 4, 3, 0, zw, oo, np. [pole
              opcjonalne]

              Pole nie jest wymagane dla przypadków określonych w
              art. 106e ust. 2, 3, ust. 4 pkt 3 i ust. 5 pkt 3 ustawy, tj.:
              świadczenie usług turystyki, dla których podstawę
              opodatkowania stanowi marża zgodnie z art. 119 ustawy;
              dostawa towarów używanych, dzieł sztuki, przedmiotów
              kolekcjonerskich, antyków, dla których podstawę
              opodatkowania stanowi marża zgodnie z art. 120 ust. 4 i
              ust. 5 ustawy; sprzedaż zwolniona, o której mowa w art.
              106b ust. 3 pkt 2 ustawy, faktura uproszczona do 450 zł.`
          },
          P_12_XII: {
            label: 'P_12_XII',
            type: 'basic',
            inputType: 'number',
            placeholder: '1',
            tooltip: `Stawka podatku od wartości dodanej w przypadku, o
            którym mowa w dziale XII w rozdziale 6a ustawy [pole
            opcjonalne]

            Podaje się stawkę podatku od wartości dodanej w
            przypadku wystawienia faktury dokumentującej
            czynności realizowane przez podatnika
            zidentyfikowanego na terytorium kraju do procedury
            unijnej OSS.

            Na stronie Komisji Europejskiej dostępna jest Baza
            stawek podatkowych w innych krajach UE.`
          },
          P_12_Zal_15: {
            label: 'P_12_Zal_15',
            type: 'select',
            items: ['1'],
            tooltip: `Znacznik dla towaru lub usługi wymienionych w
            załączniku nr 15 do ustawy [pole fakultatywne]

            W przypadku sprzedaży towaru lub usługi wymienionych
            w załączniku nr 15 do ustawy (niezależnie czy transakcja
            podlega obowiązkowemu mechanizmowi podzielonej
            płatności czy nie podlega) podaje się wartość „1"`
          },
          KwotaAkcyzy: {
            label: 'KwotaAkcyzy',
            type: 'basic',
            tooltip: `Kwota podatku akcyzowego zawarta w cenie towaru
            [pole fakultatywne]
            Zgodnie z art. 10 ust. 12 ustawy z dnia 6 grudnia 2008 r.
            o podatku akcyzowym7 na żądanie nabywcy podatnik
            akcyzy wykazuje w fakturze lub oświadczeniu załączanym
            do faktury kwotę akcyzy zawartą w cenie wyrobów
            akcyzowych wykazanych w tej fakturze.`
          },
          GTU: {
            label: 'GTU',
            type: 'select',
            items: [...GTU],
            tooltip: `Oznaczenie dotyczące dostawy towaru i świadczenia
            usług [pole fakultatywne]

            Podaje się:
            - „GTU_01” - w przypadku dostawy towarów, o których
            mowa w § 10 ust. 3 pkt 1 lit. a rozporządzenia w sprawie
            JPK_VAT z deklaracją.

            Symbol „GTU_01” oznacza dostawę napojów
            alkoholowych o zawartości alkoholu powyżej 1,2%, piwa
            oraz napojów alkoholowych będących mieszaniną piwa i
            napojów bezalkoholowych, w których zawartość
            alkoholu przekracza 0,5% (CN od 2203 do 2208).

            - „GTU_02” - w przypadku dostawy towarów, o których
            mowa w § 10 ust. 3 pkt 1 lit. b rozporządzenia w sprawie
            JPK_VAT z deklaracją.

            Symbol „GTU_02” oznacza dostawę towarów, o których
            mowa w art. 103 ust. 5aa ustawy.

            - „GTU_03” - w przypadku dostawy towarów, o których
            mowa w § 10 ust. 3 pkt 1 lit. c rozporządzenia w sprawie
            JPK_VAT z deklaracją.

            Symbol „GTU_03” oznacza dostawę olejów opałowych
            nieujętych w § 10 ust. 3 pkt 1 lit. b, olejów smarowych i
            pozostałych olejów (CN od 2710 19 71 do 2710 19 83 i CN
            od 2710 19 87 do 2710 19 99, z wyłączeniem smarów
            plastycznych zaliczonych do kodu CN 2710 19 99), olejów
            smarowych (CN 2710 20 90) oraz preparatów smarowych
            (CN 3403, z wyłączeniem smarów plastycznych objętych
            tą pozycją).

            - „GTU_04” - w przypadku dostawy towarów, o których
            mowa w § 10 ust. 3 pkt 1 lit. d rozporządzenia w sprawie
            JPK_VAT z deklaracją.

            Symbol „GTU_04” oznacza dostawę wyrobów
            tytoniowych, suszu tytoniowego, płynu do papierosów
            elektronicznych i wyrobów nowatorskich, w rozumieniu
            przepisów o podatku akcyzowym.

            - „GTU_05” - w przypadku dostawy towarów, o których
            mowa w § 10 ust. 3 pkt 1 lit. e rozporządzenia w sprawie
            JPK_VAT z deklaracją.

            Symbol „GTU_05” oznacza dostawę odpadów - wyłącznie
            określonych w poz. 79-91 załącznika nr 15 do ustawy.

            - „GTU_06” - w przypadku dostawy towarów, o których
            mowa w § 10 ust. 3 pkt 1 lit. f rozporządzenia w sprawie
            JPK_VAT z deklaracją.

            Symbol „GTU_06” oznacza dostawę urządzeń
            elektronicznych oraz części i materiałów do nich,
            wyłącznie określonych w poz. 7, 8, 59-63, 65, 66, 69 i 94-
            96 załącznika nr 15 do ustawy, a także folii typu stretch
            określonej w poz. 9 tego załącznika.

            - „GTU_07” - w przypadku dostawy towarów, o których
            mowa w § 10 ust. 3 pkt 1 lit. g rozporządzenia w sprawie
            JPK_VAT z deklaracją.

            Symbol „GTU_07” oznacza dostawę pojazdów oraz części
            (CN od 8701 do 8708).
            - „GTU_08” - w przypadku” dostawy towarów, o których
            mowa w § 10 ust. 3 pkt 1 lit. h rozporządzenia w sprawie
            JPK_VAT z deklaracją.

            Symbol „GTU_08” oznacza dostawę metali szlachetnych
            oraz nieszlachetnych - wyłącznie określonych w poz. 1 i
            1a załącznika nr 12 do ustawy oraz w poz. 12-25, 33-40,
            45, 46, 56 i 78 załącznika nr 15 do ustawy.

            - „GTU_09” - w przypadku dostawy towarów, o których
            mowa w § 10 ust. 3 pkt 1 lit. i rozporządzenia w sprawie
            JPK_VAT z deklaracją.

            Symbol „GTU_09” oznacza dostawę produktów
            leczniczych, środków spożywczych specjalnego
            przeznaczenia żywieniowego oraz wyrobów medycznych
            - wyłącznie objętych obowiązkiem zgłoszenia, o którym
            mowa w art. 37av ust. 1 ustawy z dnia 6 września 2001 r.
            - Prawo farmaceutyczne.

            - „GTU_10” - w przypadku dostawy towarów, o których
              mowa w § 10 ust. 3 pkt 1 lit. j rozporządzenia w sprawie
              JPK_VAT z deklaracją.

              Symbol „GTU_10” oznacza dostawę budynków, budowli i
              gruntów oraz ich części i udziałów w prawie własności, w
              tym również zbycia praw, o których mowa w art. 7 ust. 1
              ustawy.

              - „GTU_11” - w przypadku świadczenia usług, o których
              mowa w § 10 ust. 3 pkt 2 lit. a rozporządzenia w sprawie
              JPK_VAT z deklaracją.

              Symbol „GTU_11” oznacza świadczenie usług w zakresie
              przenoszenia uprawnień do emisji gazów cieplarnianych,
              o których mowa w ustawie z dnia 12 czerwca 2015 r. o
              systemie handlu uprawnieniami do emisji gazów
              cieplarnianych

              - „GTU_12” - w przypadku świadczenia usług, o których
              mowa w § 10 ust. 3 pkt 2 lit. b rozporządzenia w sprawie
              JPK_VAT z deklaracją.

              Symbol „GTU_12” oznacza świadczenie usług o
              charakterze niematerialnym - wyłącznie: doradczych, w
              tym doradztwa prawnego i podatkowego oraz doradztwa
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

              Symbol „GTU_13” oznacza świadczenie usług
              transportowych i gospodarki magazynowej (PKWiU 49.4,
              52.1).`
          },
          Procedura: {
            label: 'Procedura',
            type: 'select',
            items: [...OznaczenieProcedury],
            tooltip: `Oznaczenie procedury dotyczącej dostarczanego towaru
            lub świadczonej usługi [pole fakultatywne]

            Podaje się:
            - „WSTO_EE” – w przypadku procedury, o której mowa w
            § 10 ust. 4 pkt 2a rozporządzenia w sprawie JPK_VAT z
            deklaracją.

            Symbol „WSTO_EE” oznacza wewnątrzwspólnotową
            sprzedaż na odległość towarów, które w momencie
            rozpoczęcia ich wysyłki lub transportu znajdują się na
            terytorium kraju, oraz świadczenie usług
            telekomunikacyjnych, nadawczych i elektronicznych, o
            których mowa w art. 28k ustawy, na rzecz podmiotów
            niebędących podatnikami, posiadających siedzibę, stałe
            miejsce zamieszkania lub miejsce pobytu na terytorium
            państwa członkowskiego innym niż terytorium kraju.

            Obowiązkowym KSeF od 1 lipca 2024 r. nie są objęte
            transakcje, w których nabywcą jest osoba fizyczna
            nieprowadząca działalności gospodarczej.

            - „IED” - w przypadku procedury, o której mowa w § 10
            ust. 4 pkt 2b rozporządzenia w sprawie JPK_VAT z
            deklaracją.

            Symbol „IED” oznacza dostawę towarów, o której mowa
            w art. 7a ust. 1 i 2 ustawy, dokonaną przez podatnika
            ułatwiającego tę dostawę, który nie korzysta z procedury
            szczególnej, o której mowa w dziale XII w rozdziale 6a lub
            9 ustawy lub w odpowiadających im regulacjach, dla
            której miejscem dostawy jest terytorium kraju.

            Obowiązkowym KSeF od 1 lipca 2024 r. nie są objęte
            transakcje, w których nabywcą jest osoba fizyczna
            nieprowadząca działalności gospodarczej.

            - „TT_D” – w przypadku procedury, o której mowa w § 10
            ust. 4 pkt 5 rozporządzenia w sprawie JPK_VAT z
            deklaracją.

            Symbol „TT_D” oznacza dostawę towarów poza
            terytorium kraju dokonaną przez drugiego w kolejności
            podatnika VAT w ramach transakcji trójstronnej w
            procedurze uproszczonej, o której mowa w dziale XII
            rozdział 8 ustawy.

            - „I_42” – w przypadku procedury, o której mowa § 10
            ust. 4 pkt 8 rozporządzenia w sprawie JPK_VAT z
            deklaracją.

            Symbol „I_42” oznacza wewnątrzwspólnotową dostawę
            towarów następującą po imporcie tych towarów w
            ramach procedury celnej 42 (import).

            - „I_63” w przypadku procedury, o której mowa § 10 ust.
            4 pkt 9 rozporządzenia w sprawie JPK_VAT z deklaracją.

            Symbol „I_63” oznacza wewnątrzwspólnotową dostawę
            towarów następującą po imporcie tych towarów w
            ramach procedury celnej 63 (import).

            - „B_SPV” - w przypadku procedury, o której mowa w §
            10 ust. 4 pkt 10 rozporządzenia w sprawie JPK_VAT z
            deklaracją.

            Symbol „B_SPV” oznacza transfer bonu jednego
            przeznaczenia dokonany przez podatnika działającego
            we własnym imieniu, opodatkowany zgodnie z art. 8a
            ust. 1 ustawy.

            - „B_SPV_DOSTAWA” - w przypadku procedury, o której
            mowa w § 10 ust. 4 pkt 11 rozporządzenia w sprawie
            JPK_VAT z deklaracją.

            Symbol „B_SPV_DOSTAWA” oznacza dostawę towarów
            oraz świadczenie usług, których dotyczy bon jednego
            przeznaczenia na rzecz podatnika, który wyemitował bon
            zgodnie z art. 8a ust. 4 ustawy.

            - „B_MPV_PROWIZJA” – w przypadku procedury, o której
            mowa w § 10 ust. 4 pkt 12 rozporządzenia w sprawie
            JPK_VAT z deklaracją.

            Symbol „B_MPV_PROWIZJA” oznacza świadczenie usług
            pośrednictwa oraz innych usług dotyczących transferu
            bonu różnego przeznaczenia, opodatkowanych zgodnie z
            art. 8b ust. 2 ustawy.`
          },
          KursWaluty: {
            label: 'KursWaluty',
            type: 'basic',
            tooltip: `Kurs waluty stosowany do wyliczenia kwoty podatku w
            przypadkach, o których mowa w dziale VI ustawy [pole
            fakultatywne]

            W przypadku, gdy kwoty stosowane do określenia
            podstawy opodatkowania są określone w walucie obcej,
            podaje się kurs waluty właściwy dla danego wiersza
            faktury.`
          },
          StanPrzed: {
            label: 'StanPrzed',
            type: 'select',
            items: ['1'],
            tooltip: `Znacznik stanu przed korektą w przypadku faktury
            korygującej lub faktury korygującej fakturę wystawioną
            w związku z art. 106f ust. 3 ustawy, w przypadku, gdy
            korekta dotyczy danych wykazanych w pozycjach faktury
            i jest dokonywana w sposób polegający na wykazaniu
            danych przed korektą i po korekcie jako osobnych
            wierszy z odrębną numeracją oraz w przypadku
            potwierdzania braku zmiany wartości danej pozycji [pole
            fakultatywne]

            Podaje się „1” w przypadku, gdy dany wiersz faktury
            dotyczy stanu przed korektą`
          }
        }}
      />
      {children}
    </FormSection>
  )
}

export default FaWiersz
