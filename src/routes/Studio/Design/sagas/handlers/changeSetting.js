import { delay } from 'redux-saga'
import { call, select, put, takeLatest } from 'redux-saga/effects'
import { CHANGE_SETTING, CHANGE_SETTING_SUCCEEDED } from '../../modules/design'
import { takeScreenshotAPI } from '../utils/screenshot'

const getCurrentTrial = (state) => state.design.present.experiment.currentTrial

function* takeScreenshotSaga (action) {
  try {
    yield delay(500)
    const currentId = yield select(getCurrentTrial)
    const response = yield call(takeScreenshotAPI, action.payload.id, currentId)
    yield put({
      type: CHANGE_SETTING_SUCCEEDED,
      payload: {
        id: action.payload.id,
        screenshot: response.toDataURL('image/webp')
      }
    })
  } catch (e) {
    console.log('Cannot take screenshot, if it is block or run, then it is expected.')
  }
}

function* watchChangeSettingSaga () {
  yield takeLatest(CHANGE_SETTING, takeScreenshotSaga)
}

export default watchChangeSettingSaga
