import { call, put, takeLatest } from 'redux-saga/effects'
import { browserHistory } from 'react-router'
import { CREATE_EXPERIMENT, CREATE_EXPERIMENT_FAILED } from '../../modules/studio'
import { ADD_MESSAGE } from '../../../../store/message'
import { createExperimentAPI } from '../utils/network'
import uniqueId from 'lodash/uniqueId'

function* createExperimentSaga (action) {
  try {
    const response = yield call(createExperimentAPI)
    if (response.error || !response.experiment_id) {
      yield [
        put({ type: CREATE_EXPERIMENT_FAILED, message: response.error }),
        put({ type: ADD_MESSAGE, payload: { id: uniqueId(), html: 'Error creating experiment.' } })
      ]
    } else {
      browserHistory.push(`/design/${response.experiment_id}`)
    }
  } catch (e) {
    yield put({ type: CREATE_EXPERIMENT_FAILED, message: e.message })
  }
}

function* watchCreateExperimentSaga () {
  yield takeLatest(CREATE_EXPERIMENT, createExperimentSaga)
}

export default watchCreateExperimentSaga
