import { connect } from 'react-redux'
import {
  changeStructure, moveNode, moveOutside, moveInside, clickTrial,
  deleteNode, changeSetting} from '../modules/design'
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
    onChangeSetting: (id, setting) => {
      dispatch(changeSetting(id, setting))
    },
    onDeleteNode: (id) => {
      dispatch(deleteNode(id))
    }
  }
}

export default connect(null, mapDispatchToProps)(DesignPane)
