import * as handlers from './handlers'

let saga = []

for (let i in handlers) {
  saga.push(handlers[i])
}

export default saga
