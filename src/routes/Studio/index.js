import StudioLayout from './layouts/CoreLayout/CoreLayout'
import Design from './Design'

export default (store) => ({
  path : 'studio/:experimentId',
  /*  Async getComponent is only invoked when route matches   */
  component: StudioLayout,
  indexRoute: Design(store),
  childRoutes : [
    // Material(store),
    // Distribute(store),
    // Data(store)
  ]
})

