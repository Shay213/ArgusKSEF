import FormSection from '../../FormItems-base/FormSection'
import KodWaluty from '../../FormItems/KodWaluty'
import P_1 from '../../FormItems/P_1'
import P_1M from '../../FormItems/P_1M'
import P_2 from '../../FormItems/P_2'
import OkresFa_P_6 from '../../FormSections/OkresFa_P_6'
import WZ from '../../FormSections/WZ'

interface Props {
  optional?: boolean
}

const SzczegolyFaktury = ({ optional }: Props): JSX.Element => {
  return (
    <FormSection title="Szczegóły Faktury" size="lg" optional={optional}>
      <div className="flex flex-col gap-2">
        <KodWaluty />
        <P_1 />
        <P_1M optional />
        <P_2 />
        <OkresFa_P_6 />
        <WZ optional />
      </div>
    </FormSection>
  )
}

export default SzczegolyFaktury
