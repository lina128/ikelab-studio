import { connect } from 'react-redux'
import { toggleTrialCondition, deleteCondition, renameCondition } from '../modules/design'
import ConditionTools from '../components/ConditionTools'

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTrialCondition: (condition) => {
      dispatch(toggleTrialCondition(condition))
    },
    deleteCondition: (id) => {
      dispatch(deleteCondition(id))
    },
    renameCondition: (id, value) => {
      dispatch(renameCondition(id, value))
    }
  }
}

export default connect(null, mapDispatchToProps)(ConditionTools)
