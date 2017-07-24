import { fork } from 'redux-saga/effects'
import DesignSaga from '../routes/Studio/Design/sagas/design'
import StudioSaga from '../routes/Home/sagas/studio'

const sagas = [
  ...DesignSaga,
  ...StudioSaga
]

export default function* root () {
  yield sagas.map(saga => fork(saga))
}
