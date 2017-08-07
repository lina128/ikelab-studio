import { delay } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import { SAVE_EXPERIMENT, SAVE_EXPERIMENT_SUCCEEDED, SAVE_EXPERIMENT_FAILED } from '../../modules/design'
import { ADD_MESSAGE } from '../../../../../store/message'
import { saveExperimentAPI } from '../utils/experiment'
import uniqueId from 'lodash/uniqueId'

function* saveExperimentSaga (action) {
  try {
    if (__DEV__) {
      yield put({ type: SAVE_EXPERIMENT_SUCCEEDED })
    } else {
      yield delay(1000)
      const response = yield call(saveExperimentAPI, action.payload.experiment)
      if (response.error) {
        yield [
          put({ type: SAVE_EXPERIMENT_FAILED, message: response.error }),
          put({ type: ADD_MESSAGE, payload: { id: uniqueId(), html: 'Error saving the experiment.' } })
        ]
      } else {
        yield put({ type: SAVE_EXPERIMENT_SUCCEEDED })
      }
    }
  } catch (e) {
    console.log(e)
    yield [
      put({ type: SAVE_EXPERIMENT_FAILED, message: e }),
      put({ type: ADD_MESSAGE, payload: { id: uniqueId(), html: 'Error saving the experiment.' } })
    ]
  }
}

function* watchSaveExperimentSaga () {
  yield takeLatest(SAVE_EXPERIMENT, saveExperimentSaga)
}

export default watchSaveExperimentSaga
