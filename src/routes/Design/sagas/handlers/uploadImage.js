import { delay } from 'redux-saga'
import { call, put, takeEvery } from 'redux-saga/effects'
import { UPLOAD_IMAGE, CHANGE_SETTING } from '../../modules/design'
import { ADD_MESSAGE } from '../../../../store/message'
import { uploadImageAPI, getImageAPI, addUserTagAPI } from '../utils/image'
import uniqueId from 'lodash/uniqueId'
import random from 'lodash/random'

function* getImageSaga (url) {
  for (let i = 0; i < 10; i++) {
    try {
      const response = yield call(getImageAPI, url)
      return response
    } catch (err) {
      if (i < 10) {
        delay(1000)
      }
    }
  }

  throw new Error('Error uploading the image.')
}

function* uploadImageSaga (action) {
  try {
    let name = `${random(1000, 9999)}-${action.payload.file.name}`
    const response = yield call(uploadImageAPI, name, action.payload.file)
    if (response.error) {
      yield put({ type: ADD_MESSAGE, payload: { id: uniqueId(), html: response.error } })
    } else {
      const url = `${IKELAB_IMAGES_STORE}/${name}`
      yield call(getImageSaga, url)
      const taggingCall = yield call(addUserTagAPI, name, 'USER_ID')
      if (taggingCall.error) {
        yield put({ type: ADD_MESSAGE, payload: { id: uniqueId(), html: taggingCall.error } })
      } else {
        yield put({
          type: CHANGE_SETTING,
          payload: {
            id: action.payload.id,
            setting: { [action.payload.key]: url }
          } })
      }
    }
  } catch (e) {
    yield put({ type: ADD_MESSAGE, payload: { id: uniqueId(), html: 'Error uploading the image.' } })
  }
}

function* watchUploadImageSaga () {
  yield takeEvery(UPLOAD_IMAGE, uploadImageSaga)
}

export default watchUploadImageSaga

