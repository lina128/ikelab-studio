import { injectReducer } from '../../store/reducers'
import { requireAuth } from '../../containers/AppContainer'

export default (store) => ({
  path : 'studio',
  onEnter: requireAuth,
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Studio = require('./components/StudioView').default
      const reducer = require('./modules/studio').default

      injectReducer(store, { key: 'studio', reducer })

      /*  Return getComponent   */
      cb(null, Studio)

    /* Webpack named bundle   */
    }, 'studio')
  }
})
