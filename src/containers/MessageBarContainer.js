import { connect } from 'react-redux'
import { deleteMessage } from '../store/message'
import MessageBar from '../components/Message/MessageBar'

const mapStateToProps = (state) => {
  return {
    messages: state.message.messages
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
