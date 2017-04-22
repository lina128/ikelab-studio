import { delay } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import { CHANGE_TRIAL_SETTING, CHANGE_TRIAL_SETTING_FAILED, CHANGE_TRIAL_SETTING_SUCCEEDED } from '../../modules/design'
import { changeTrialSettingAPI } from '../utils/screenshot'

function* changeTrialSettingSaga (action) {
  try {
    yield delay(500)
    const response = yield call(changeTrialSettingAPI, action.payload.id)

    if (response.error) {
      yield put({ type: CHANGE_TRIAL_SETTING_FAILED })
    } else {
      yield put({
        type: CHANGE_TRIAL_SETTING_SUCCEEDED,
        payload: {
          id: action.payload.id,
          change: { screenshot: response.toDataURL('image/webp') }
        }
      })
    }
  } catch (e) {
    yield put({ type: CHANGE_TRIAL_SETTING_FAILED })
  }
}

function* watchChangeTrialSettingSaga () {
  yield takeLatest(CHANGE_TRIAL_SETTING, changeTrialSettingSaga)
}

export default watchChangeTrialSettingSaga
