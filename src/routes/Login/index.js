import { auth0 } from '../../containers/AppContainer'

export default {
  path: 'login',
  onEnter: auth0.parseHash
}
