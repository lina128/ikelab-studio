import { delay } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import { FETCH_EXPERIMENTS, FETCH_EXPERIMENTS_SUCCEEDED, FETCH_EXPERIMENTS_FAILED } from '../../modules/studio'
import { ADD_MESSAGE } from '../../../../store/message'
import { fetchExperimentsAPI } from '../utils/network'
import uniqueId from 'lodash/uniqueId'
import { MOCKUPEXPERIMENTS } from './mockup'

function* fetchExperimentsSaga (action) {
  try {
    if (__DEV__) {
      yield delay(500)
      yield put({
        type: FETCH_EXPERIMENTS_SUCCEEDED,
        payload: { experiments: MOCKUPEXPERIMENTS }
      })
    } else {
      const response = yield call(fetchExperimentsAPI)
      if (response.error) {
        yield [
          put({ type: FETCH_EXPERIMENTS_FAILED, message: response.error }),
          put({ type: ADD_MESSAGE, payload: { id: uniqueId(), html: 'Error fetching experiments.' } })
        ]
      } else {
        yield put({
          type: FETCH_EXPERIMENTS_SUCCEEDED,
          payload: { experiments: response }
        })
      }
    }
  } catch (e) {
    yield put({ type: FETCH_EXPERIMENTS_FAILED, message: e.message })
  }
}

function* watchFetchExperimentsSaga () {
  yield takeLatest(FETCH_EXPERIMENTS, fetchExperimentsSaga)
}

export default watchFetchExperimentsSaga
