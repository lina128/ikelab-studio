import { connect } from 'react-redux'
import { changeSetting } from '../modules/design'
import TrialToolsVertical from '../components/TrialToolsVertical'

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (id, change) => {
      dispatch(changeSetting(id, change))
    }
  }
}

export default connect(null, mapDispatchToProps)(TrialToolsVertical)
