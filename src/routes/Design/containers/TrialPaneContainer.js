import { changeSetting } from '../modules/design'
import { connect } from 'react-redux'
import TrialPane from '../components/TrialPane'

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (id = 0, change) => {
      dispatch(changeSetting(id, change))
    }
  }
}

export default connect(null, mapDispatchToProps)(TrialPane)
