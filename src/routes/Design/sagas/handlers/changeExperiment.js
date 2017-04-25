import { delay } from 'redux-saga'
import { put, select, takeLatest } from 'redux-saga/effects'
import { CHANGE_STRUCTURE, SAVE_EXPERIMENT } from '../../modules/design'

export const getExperiment = (state) => state.design.present

function* changeExperimentSaga (action) {
  const experiment = yield select(getExperiment)
  delay(1000)
  yield put({ type: SAVE_EXPERIMENT, payload: experiment })
}

function* watchChangeExperimentSaga () {
  yield takeLatest([CHANGE_STRUCTURE], changeExperimentSaga)
}

export default watchChangeExperimentSaga
