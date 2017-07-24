import { connect } from 'react-redux'
import { deleteMessage } from '../modules/studio'
import MessageBar from '../components/MessageBar'

const mapStateToProps = (state) => {
  return {
    messages: state.studio.messages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMessage: (id) => {
      dispatch(deleteMessage(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBar)
