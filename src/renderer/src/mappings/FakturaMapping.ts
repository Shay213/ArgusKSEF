import NaglowekMapping from './NaglowekMapping'
import Podmiot1Mapping from './Podmiot1Mapping'
import Podmiot2Mapping from './Podmiot2Mapping'
import FaMapping from './FaMapping'
import StopkaMapping from './StopkaMapping'

const FakturaMapping = {
  ...NaglowekMapping,
  ...Podmiot1Mapping,
  ...Podmiot2Mapping,
  ...FaMapping,
  ...StopkaMapping
}

export default FakturaMapping
