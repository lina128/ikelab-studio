import { call, put, takeLatest } from 'redux-saga/effects'
import { FETCH_EXPERIMENT, FETCH_EXPERIMENT_SUCCEEDED, FETCH_EXPERIMENT_FAILED } from '../../modules/design'
import { ADD_MESSAGE } from '../../../../store/message'
import { fetchExperimentAPI } from '../utils/network'
import uniqueId from 'lodash/uniqueId'

function* fetchExperimentSaga (action) {
  try {
    const response = yield call(fetchExperimentAPI, action.payload.id)

    if (response.error) {
      yield put({ type: FETCH_EXPERIMENT_FAILED, message: response.error })
    } else {
      const experiment = {
        experimentId: parseInt(action.payload.id),
        ...response
      }
      yield put({
        type: FETCH_EXPERIMENT_SUCCEEDED,
        payload: { experiment }
      })
    }
  } catch (e) {
    yield put({ type: FETCH_EXPERIMENT_FAILED, message: e.message })
    yield put({ type: ADD_MESSAGE, payload: { id: uniqueId(), html: 'Error fetching the experiment.' } })
  }
}

function* watchFetchExperimentSaga () {
  yield takeLatest(FETCH_EXPERIMENT, fetchExperimentSaga)
}

export default watchFetchExperimentSaga
