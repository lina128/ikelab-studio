import { changeTrialSetting } from '../modules/design'
import flow from 'lodash/flow'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import TrialPane from '../components/TrialPane'

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (id = 0, change) => {
      dispatch(changeTrialSetting(id, change))
    }
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

export default flow(
  DropTarget('', {}, collect),
  connect(null, mapDispatchToProps)
)(TrialPane)
