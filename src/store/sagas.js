import { fork } from 'redux-saga/effects'
import DesignSaga from '../routes/Design/sagas/design'
import StudioSaga from '../routes/Studio/sagas/studio'

const sagas = [
  ...DesignSaga,
  ...StudioSaga
]

export default function* root () {
  yield sagas.map(saga => fork(saga))
}
