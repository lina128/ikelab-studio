import { auth0 } from '../../../../containers/AppContainer'

export const fetchExperimentAPI = (id) => {
  return fetch(FETCH_EXPERIMENT_URL, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${auth0.getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      experimentId: id
    })
  })
  .then(response => {
    return response.json().then(data => {
      if (response.ok) {
        return data
      } else {
        return Promise.reject({ error: response.status })
      }
    })
  })
  .catch(error => { error })
}

export const saveExperimentAPI = (experiment) => {
  return fetch(SAVE_EXPERIMENT_URL, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${auth0.getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(experiment)
  })
  .then(response => {
    return response.json().then(data => {
      if (response.ok) {
        return data
      } else {
        return Promise.reject({ error: response.status })
      }
    })
  })
  .catch(error => { error })
}

export const uploadImageAPI = (file) => {
  return fetch(`${IKELAB_IMAGEUPLOAD}/requestUploadURL`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: file.name,
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
    console.log(error)
    return error
  })
}

export const getImageAPI = url => {
  return fetch(url, {
    mode: 'cors',
    method: 'GET'
  })
  .then(response => {
    if (response.ok) {
      return Promise.resolve()
    } else {
      throw new Error('Image key not available.')
    }
  })
  .catch(error => error)
}
