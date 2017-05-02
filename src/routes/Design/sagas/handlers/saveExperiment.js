import { delay } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import { SAVE_EXPERIMENT, SAVE_EXPERIMENT_SUCCEEDED, SAVE_EXPERIMENT_FAILED } from '../../modules/design'
import { ADD_MESSAGE } from '../../../../store/message'
import { saveExperimentAPI } from '../utils/network'
import uniqueId from 'lodash/uniqueId'

function* saveExperimentSaga (action) {
  try {
    yield delay(1000)
    const response = yield call(saveExperimentAPI, action.payload.experiment)
    if (response.error) {
      yield put({ type: SAVE_EXPERIMENT_FAILED, message: response.error })
    } else {
      yield put({ type: SAVE_EXPERIMENT_SUCCEEDED })
    }
  } catch (e) {
    yield put({ type: SAVE_EXPERIMENT_FAILED, message: e.message })
    yield put({ type: ADD_MESSAGE, payload: { id: uniqueId(), html: 'Error saving the experiment.' } })
  }
}

function* watchSaveExperimentSaga () {
  yield takeLatest(SAVE_EXPERIMENT, saveExperimentSaga)
}

export default watchSaveExperimentSaga
