import { delay } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import { FETCH_EXPERIMENT, FETCH_EXPERIMENT_SUCCEEDED } from '../../modules/design'
import { ADD_MESSAGE } from '../../../../../store/message'
import { fetchExperimentAPI } from '../utils/experiment'
import uniqueId from 'lodash/uniqueId'
import { MOCKUPEXPERIMENT } from './mockup'

function* fetchExperimentSaga (action) {
  try {
    if (__DEV__) {
      yield delay(500)
      yield put({
        type: FETCH_EXPERIMENT_SUCCEEDED,
        payload: { ...MOCKUPEXPERIMENT }
      })
    } else {
      const response = yield call(fetchExperimentAPI, action.payload.id)

      if (response.error) {
        yield put({
          type: ADD_MESSAGE,
          payload: { id: uniqueId(), html: 'Error fetching the experiment.' } })
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
    }
  } catch (e) {
    console.log('Fetch experiment failed.', e.message)
  }
}

function* watchFetchExperimentSaga () {
  yield takeLatest(FETCH_EXPERIMENT, fetchExperimentSaga)
}

export default watchFetchExperimentSaga
