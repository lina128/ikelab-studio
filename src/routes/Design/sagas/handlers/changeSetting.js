import { delay } from 'redux-saga'
import { call, select, put, takeLatest } from 'redux-saga/effects'
import { CHANGE_SETTING, CHANGE_SETTING_FAILED, CHANGE_SETTING_SUCCEEDED } from '../../modules/design'
import { changeSettingAPI } from '../utils/screenshot'

const getCurrentTrial = (state) => state.design.present.currentTrial

function* changeSettingSaga (action) {
  try {
    yield delay(500)
    const currentId = yield select(getCurrentTrial)
    const response = yield call(changeSettingAPI, action.payload.id, currentId)

    if (!response) {
      yield put({
        type: CHANGE_SETTING_SUCCEEDED
      })
    } else if (response.error) {
      yield put({ type: CHANGE_SETTING_FAILED })
    } else {
      yield put({
        type: CHANGE_SETTING_SUCCEEDED,
        payload: {
          id: action.payload.id,
          screenshot: response.toDataURL('image/webp')
        }
      })
    }
  } catch (e) {
    yield put({ type: CHANGE_SETTING_FAILED })
  }
}

function* watchChangeSettingSaga () {
  yield takeLatest(CHANGE_SETTING, changeSettingSaga)
}

export default watchChangeSettingSaga
