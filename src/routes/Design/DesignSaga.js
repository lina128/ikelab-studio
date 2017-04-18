import { delay } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import { FETCH_EXPERIMENT } from './modules/design'
import { fetchExperiment } from './networks'

function* fetchExperimentSaga (action) {
  try {
    yield delay(500)
    const { response, error } = yield call(fetchExperiment, action.payload.id)
    if (response) {
      console.log(response, error)
      yield put({ type: 'FETCH_EXPERIMENT_SUCEEDED', payload: { experiment: response } })
    } else {
      console.log(response, error)
      yield put({ type: 'FETCH_EXPERIMENT_FAILED', message: error })
    }
  } catch (e) {
    yield put({ type: 'FETCH_EXPERIMENT_FAILED', message: e.message })
  }
}

function* watchFetchExperimentSaga () {
  yield takeLatest(FETCH_EXPERIMENT, fetchExperimentSaga)
}

export default [watchFetchExperimentSaga]
