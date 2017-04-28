import { auth0 } from '../../../../containers/AppContainer'

export const fetchExperimentsAPI = () => {
  return fetch(__FETCH_EXPERIMENTS_URL__, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${auth0.getToken()}`,
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

export const createExperimentAPI = () => {
  return fetch(__CREATE_EXPERIMENT_URL__, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${auth0.getToken()}`,
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
