import { connect } from 'react-redux'
import { changeSetting } from '../modules/design'
import TrialTools from '../components/TrialTools'

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (id, change) => {
      dispatch(changeSetting(id, change))
    }
  }
}

export default connect(null, mapDispatchToProps)(TrialTools)
