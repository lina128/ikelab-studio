import { auth0 } from '../../../../../containers/AppContainer'

//'Authorization': `Bearer ${auth0.getToken()}`,
export const fetchExperimentAPI = (id) => {
  return fetch(FETCH_EXPERIMENT_URL, {
    mode: 'cors',
    method: 'GET',
    headers: {
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
  .catch(error => { throw new Error(error) })
}

// 'Authorization': `Bearer ${auth0.getToken()}`,
export const saveExperimentAPI = (experiment) => {
  return fetch(SAVE_EXPERIMENT_URL, {
    mode: 'cors',
    method: 'PUT',
    headers: {
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
  .catch(error => { throw new Error(error) })
}
