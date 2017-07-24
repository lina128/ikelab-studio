import { auth0 } from '../../../../../containers/AppContainer'

export const uploadImageAPI = (name, file) => {
  return fetch(`${IKELAB_IMAGES}/requestUploadURL`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      type: file.type,
      size: file.size
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json().then(json => fetch(json.uploadURL, {
        mode: 'cors',
        method: 'PUT',
        body: file
      }))
    } else {
      if (response.status === 400) {
        return Promise.reject({ error: 'Image too large.' })
      } else {
        return Promise.reject({ error: 'Error uploading image.' })
      }
    }
  })
  .then(response => {
    if (response.ok) {
      return Promise.resolve({})
    } else {
      return Promise.reject({ error: 'Error uploading image.' })
    }
  })
  .catch(error => {
    throw new Error(error)
  })
}

export const getImageAPI = url => {
  return fetch(url, {
    mode: 'cors',
    method: 'GET'
  })
  .then(response => {
    if (response.ok) {
      return Promise.resolve({})
    } else {
      throw new Error('Image key not available.')
    }
  })
  .catch(error => error)
}

export const addUserTagAPI = (name, key) => {
  let tag = window.btoa(auth0.getProfile().sub)

  return fetch(`${IKELAB_IMAGES}/addTag`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      key: key,
      tag: tag
    })
  })
  .then(response => response.json().then(data => {
    if (response.ok) {
      return data
    } else {
      return Promise.reject({ error: 'Error tagging image.' })
    }
  }))
  .catch(error => {
    throw new Error(error)
  })
}
