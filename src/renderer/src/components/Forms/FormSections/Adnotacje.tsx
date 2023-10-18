import { FormField } from '@renderer/components/ui/form'
import { useFormContext } from 'react-hook-form'
import Zwolnienie from './Zwolnienie'
import NoweSrodkiTransportu from './NoweSrodkiTransportu'
import PMarzy from './PMarzy'
import FormSection from '../FormItems-base/FormSection'
import SelectFormItem from '../FormItems-base/SelectFormItem'
import P_23 from '../FormItems/P_23'

interface Props {
  optional?: boolean
}

const Adnotacje = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormSection
      title="Adnotacje"
      optional={optional}
      size="lg"
      tooltipMessage="Adnotacje na fakturze

      Element zawierający adnotacje na fakturze wynikające ze
      specyfiki danej transakcji (np. odwrotne obciążenie,
      samofakturowanie, podstawa prawna zastosowanego
      zwolnienia itp.)"
    >
      <div className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="Adnotacje.P_16"
          render={({ field }): JSX.Element => (
            <SelectFormItem
              field={field}
              items={['1', '2']}
              label="P_16"
              placeholder="Wybierz P_16"
              tooltipMessage="Adnotacja „metoda kasowa”

            W przypadku faktury zawierającej adnotację „metoda
            kasowa”, dokumentującej dostawę towarów lub
            świadczenie usług, w odniesieniu do których obowiązek
            podatkowy powstaje zgodnie z art. 19a ust. 5 pkt 1 lub
            art. 21 ust. 1 ustawy, należy podać wartość 1 w
            przeciwnym przypadku należy podać wartość 2."
            />
          )}
        />
        <FormField
          control={form.control}
          name="Adnotacje.P_17"
          render={({ field }): JSX.Element => (
            <SelectFormItem
              field={field}
              items={['1', '2']}
              label="P_17"
              placeholder="Wybierz P_17"
              tooltipMessage="Adnotacja „samofakturowanie”

            W przypadku faktury, o której mowa w art. 106d ust. 1
            ustawy, zawierającej adnotację „samofakturowanie”,
            należy podać wartość 1 w przeciwnym przypadku
            należy podać wartość 2.

            Procedura zatwierdzania poszczególnych faktur
            (wystawianych przez nabywcę w ramach
            samofakturowania) przez podatnika dokonującego
            czynności opodatkowanej, odbywa się poza KSeF."
            />
          )}
        />
        <FormField
          control={form.control}
          name="Adnotacje.P_18"
          render={({ field }): JSX.Element => (
            <SelectFormItem
              field={field}
              items={['1', '2']}
              label="P_18"
              placeholder="Wybierz P_18"
              tooltipMessage={`Adnotacja „odwrotne obciążenie”

            W przypadku faktury zawierającej adnotację „odwrotne
            obciążenie”, dokumentującej dostawę towarów lub
            wykonanie usługi, dla których obowiązanym do
            rozliczenia podatku od wartości dodanej lub podatku o
            podobnym charakterze jest nabywca towaru lub usługi -
            należy podać wartość „1"; w przeciwnym przypadku
            należy podać wartość „2".

            Zgodnie z przepisem epizodycznym art. 145g pkt 2
            ustawy, faktura dokumentująca czynności, o których
            mowa w art. 145e ust. 1 ustawy, powinna zawierać
            wyrazy, o których mowa w art. 106e ust. 1 pkt 18 ustawy
            tj. adnotację „odwrotne obciążenie”. W takim przypadku
            w polu P_18 należy podać wartość „1"; w przeciwnym
            przypadku należy podać wartość „2".

            W przypadku faktury zawierającej adnotację „odwrotne
            obciążenie”, dokumentującej dostawę towarów lub
            wykonanie usługi, dla których obowiązanym do
            rozliczenia podatku jest nabywca towaru lub usługi
            (transakcja, o której mowa w art. 17 ust. 1 pkt 7 lub pkt 8
            ustawy, obowiązującym przed 1 listopada 2019 r.) należy
            podać wartość „1"; w przeciwnym przypadku należy
            podać wartość „2".`}
            />
          )}
        />
        <FormField
          control={form.control}
          name="Adnotacje.P_18A"
          render={({ field }): JSX.Element => (
            <SelectFormItem
              field={field}
              items={['1', '2']}
              label="P_18A"
              placeholder="Wybierz P_18A"
              tooltipMessage={`Adnotacja „mechanizm podzielonej płatności”

            W przypadku faktury zawierającej adnotację
            „mechanizm podzielonej płatności”, w której kwota
            należności ogółem przekracza kwotę 15.000 zł lub jej
            równowartość wyrażoną w walucie obcej, obejmującej
            dokonaną na rzecz podatnika dostawę towarów lub
            świadczenie usług wymienionych w załączniku nr 15 do
            ustawy, przy czym do przeliczania na złote kwot
            wyrażonych w walucie obcej stosuje się zasady
            przeliczania kwot stosowane w celu określenia podstawy
            opodatkowania, należy podać wartość „1"; w
            przeciwnym przypadku należy podać wartość „2”.`}
            />
          )}
        />
        <Zwolnienie formFieldNamePrefix="Adnotacje." />
        <NoweSrodkiTransportu formFieldNamePrefix="Adnotacje." />
        <FormField
          control={form.control}
          name="Adnotacje.P_23"
          render={({ field }): JSX.Element => <P_23 field={field} />}
        />
        <PMarzy formFieldNamePrefix="Adnotacje." />
      </div>
    </FormSection>
  )
}

export default Adnotacje
