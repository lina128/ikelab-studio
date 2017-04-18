import { FETCH_EXPERIMENT_URL } from '../config'
import { auth0 } from '../../../containers/AppContainer'

const fetchExperiment = (id) => {
  fetch(FETCH_EXPERIMENT_URL, {
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
  .then( response => {
    let responseJson = response.json()
    if (response.status >= 200 && response.status < 300) {
      return responseJson
    } else {
      return json.then(Promise.reject.bind(Promise))
    }
  })
  .catch(error => { error })
}

export default fetchExperiment
