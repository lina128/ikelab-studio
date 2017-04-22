import { connect } from 'react-redux'
import {
  changeStructure, moveNode, moveOutside, moveInside, clickTrial,
  deleteNode, changeBlockSetting, changeRunSetting
} from '../modules/design'
import DesignPane from '../components/DesignPane'

const mapDispatchToProps = (dispatch) => {
  return {
    changeStructure: () => {
      dispatch(changeStructure())
    },
    onNodeMove: (id, afterId, direction) => {
      dispatch(moveNode(id, afterId, direction))
    },
    onMoveOutside: (id) => {
      dispatch(moveOutside(id))
    },
    onMoveInside: (id, parentId) => {
      dispatch(moveInside(id, parentId))
    },
    onClickTrial: (id) => {
      dispatch(clickTrial(id))
    },
    onChangeBlockSetting: (id, setting) => {
      dispatch(changeBlockSetting(id, setting))
    },
    onChangeRunSetting: (id, setting) => {
      dispatch(changeRunSetting(id, setting))
    },
    onDeleteNode: (id) => {
      dispatch(deleteNode(id))
    }
  }
}

export default connect(null, mapDispatchToProps)(DesignPane)
