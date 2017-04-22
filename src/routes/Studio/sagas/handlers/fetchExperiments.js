import { call, put, takeLatest } from 'redux-saga/effects'
import { FETCH_EXPERIMENTS, FETCH_EXPERIMENTS_SUCCEEDED, FETCH_EXPERIMENTS_FAILED } from '../../modules/studio'
import { fetchExperimentsAPI } from '../utils/network'

function* fetchExperimentsSaga (action) {
  try {
    const response = yield call(fetchExperimentsAPI)
    if (response.error) {
      yield put({ type: FETCH_EXPERIMENTS_FAILED, message: response.error })
    } else {
      yield put({
        type: FETCH_EXPERIMENTS_SUCCEEDED,
        payload: { experiments: response }
      })
    }
  } catch (e) {
    yield put({ type: FETCH_EXPERIMENTS_FAILED, message: e.message })
  }
}

function* watchFetchExperimentsSaga () {
  yield takeLatest(FETCH_EXPERIMENTS, fetchExperimentsSaga)
}

export default watchFetchExperimentsSaga