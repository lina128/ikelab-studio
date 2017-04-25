import { connect } from 'react-redux'
import { changeStructure, moveNode, moveInside, clickTrial } from '../modules/design'
import DesignPane from '../components/DesignPane'

const mapDispatchToProps = (dispatch) => {
  return {
    changeStructure: () => {
      dispatch(changeStructure())
    },
    moveNode: (id, afterId, direction) => {
      dispatch(moveNode(id, afterId, direction))
    },
    moveInside: (id, parentId) => {
      dispatch(moveInside(id, parentId))
    },
    clickTrial: (id) => {
      dispatch(clickTrial(id))
    }
  }
}

export default connect(null, mapDispatchToProps)(DesignPane)
