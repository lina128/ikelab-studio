import { fork } from 'redux-saga/effects'
import DesignSaga from '../routes/Design/DesignSaga'

const sagas = [
  ...DesignSaga
]

export default function* root () {
  yield sagas.map(saga => fork(saga))
}
