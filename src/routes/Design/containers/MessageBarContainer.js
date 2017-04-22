import { connect } from 'react-redux'
import { deleteMessage } from '../modules/design'
import MessageBar from '../components/MessageBar'

const mapStateToProps = (state) => {
  return {
    messages: state.design.present.messages
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
