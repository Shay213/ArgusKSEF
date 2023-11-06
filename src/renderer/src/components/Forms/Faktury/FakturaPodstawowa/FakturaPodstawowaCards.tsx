import DaneFaktury from './DaneFaktury'
import Nabywca from './Nabywca'
import PodmiotInny from './PodmiotInny'
import Sprzedawca from './Sprzedawca'
import Stopka from './Stopka'

interface CardsProps {
  getFormValueRef: (obj: IGetFormValuesRef) => void
  mappedTemplate: ITemplate | null
}

const FakturaPodstawowaCards = [
  {
    title: 'Dane Faktury',
    description: `Zawiera szczegółowe informacje dotyczące transakcji
    dokumentowanej fakturą. W szczególności są to elementy
    faktury wynikające z treści obowiązujących przepisów, jak
    również elementy dotyczące m.in. rozliczenia, płatności oraz
    warunków transakcji.`,
    element: (props: CardsProps): JSX.Element => <DaneFaktury {...props} />
  },
  {
    title: 'Sprzedawca',
    description: `Zawiera informacje, które charakteryzują podatnika(sprzedawcę)`,
    element: (props: CardsProps): JSX.Element => <Sprzedawca {...props} />
  },
  {
    title: 'Nabywca',
    description: `Zawiera informacje, które charakteryzują nabywcę towaru lub usługi`,
    element: (props: CardsProps): JSX.Element => <Nabywca {...props} />
  },
  {
    title: 'Podmiot Inny',
    description: `Zawiera dane podmiotu/-ów trzeciego/-ich (innego/-ych niż
    sprzedawca i nabywca`,
    element: (props: CardsProps): JSX.Element => <PodmiotInny {...props} />
  },
  {
    title: 'Stopka',
    description: `Zawiera pozostałe informacje na fakturze. m.in. stopkę faktury,
    numer KRS, REGON`,
    element: (props: CardsProps): JSX.Element => <Stopka {...props} />
  }
]

export default FakturaPodstawowaCards
