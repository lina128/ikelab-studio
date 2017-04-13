import { connect } from 'react-redux'
import { auth0Lock } from './AppContainer'
import { logOut } from '../store/user'
import Header from '../components/Header'

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => {
      dispatch(logOut())
      auth0Lock.logout()
    }
  }
}

export default connect(null, mapDispatchToProps)(Header)
