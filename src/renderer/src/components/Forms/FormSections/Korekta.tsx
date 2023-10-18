import FormSection from '../FormItems-base/FormSection'
import KursWalutyZK from '../FormItems/KursWalutyZK'
import NrFaKorygowany from '../FormItems/NrFaKorygowany'
import OkresFaKorygowanej from '../FormItems/OkresFaKorygowanej'
import P_15ZK from '../FormItems/P_15ZK'
import PrzyczynaKorekty from '../FormItems/PrzyczynaKorekty'
import TypKorekty from '../FormItems/TypKorekty'
import DaneFakturyKorygowanej from './DaneFakturyKorygowanej'
import Podmiot1k from './Podmiot1k'
import Podmiot2k from './Podmiot2k'

interface Props {
  optional?: boolean
}

const Korekta = ({ optional }: Props): JSX.Element => {
  return (
    <FormSection title="Korekta" size="lg" optional={optional}>
      <div className="flex flex-col gap-2">
        <PrzyczynaKorekty optional />
        <TypKorekty optional />
        <DaneFakturyKorygowanej />
        <OkresFaKorygowanej optional />
        <NrFaKorygowany optional />
        <Podmiot1k />
        <Podmiot2k />
        <P_15ZK />
        <KursWalutyZK optional />
      </div>
    </FormSection>
  )
}

export default Korekta
