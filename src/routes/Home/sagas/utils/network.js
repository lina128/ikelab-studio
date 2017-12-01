import { auth0 } from '../../../../containers/AppContainer'

// 'Authorization': `Bearer ${auth0.getToken()}`,
export const fetchExperimentsAPI = () => {
  return fetch(FETCH_EXPERIMENTS_URL, {
    mode: 'cors',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: auth0.getProfile().sub
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

//      'Authorization': `Bearer ${auth0.getToken()}`,
export const createExperimentAPI = () => {
  return fetch(CREATE_EXPERIMENT_URL, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: auth0.getProfile().sub
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
