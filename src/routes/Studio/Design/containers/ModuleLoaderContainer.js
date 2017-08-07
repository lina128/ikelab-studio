import { connect } from 'react-redux'
import { addTrial, addBlock, addRun, addBlockTrials } from '../modules/design'
import ModuleLoader from '../components/ModuleLoader'

const mapDispatchToProps = (dispatch) => {
  return {
    addTrial: (type) => {
      dispatch(addTrial(type))
    },
    addBlock: () => {
      dispatch(addBlock())
    },
    addRun: () => {
      dispatch(addRun())
    },
    addBlockTrials: (block, trials) => {
      dispatch(addBlockTrials(block, trials))
    }
  }
}

export default connect(null, mapDispatchToProps)(ModuleLoader)
