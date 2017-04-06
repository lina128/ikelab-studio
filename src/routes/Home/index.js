import { requireAuth } from '../../utils/AuthService'
import HomeView from './components/HomeView'

export default {
  onEnter: requireAuth,
  component: HomeView
}
