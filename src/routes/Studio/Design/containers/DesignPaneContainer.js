import { connect } from 'react-redux'
import { moveOutside, moveNode, moveInside, clickTrial, copyCurrentTrial, deleteCurrentTrial } from '../modules/design'
import DesignPane from '../components/DesignPane'

const mapDispatchToProps = (dispatch) => {
  return {
    moveNode: (id, afterId, direction) => {
      dispatch(moveNode(id, afterId, direction))
    },
    moveInside: (id, parentId) => {
      dispatch(moveInside(id, parentId))
    },
    moveOutside: () => {
      dispatch(moveOutside())
    },
    clickTrial: (id) => {
      dispatch(clickTrial(id))
    },
    copyCurrentTrial: () => {
      dispatch(copyCurrentTrial())
    },
    deleteCurrentTrial: () => {
      dispatch(deleteCurrentTrial())
    }
  }
}

export default connect(null, mapDispatchToProps)(DesignPane)
