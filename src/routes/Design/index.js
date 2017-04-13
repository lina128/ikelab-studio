import { injectReducer } from '../../store/reducers'
import { UPDATE_STRUCTURE, ADD_MESSAGE, DELETE_MESSAGE } from './modules/design'
import undoable, { excludeAction } from 'redux-undo'
import { requireAuth } from '../../containers/AppContainer'

export default (store) => ({
  path : 'design/:experimentId',
  onEnter: requireAuth,
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Design = require('./components/DesignView').default
      const reducer = undoable(require('./modules/design').default, {
        limit: 10,
        filter: excludeAction([UPDATE_STRUCTURE, ADD_MESSAGE, DELETE_MESSAGE])
      })

      /*  Add the reducer to the store on key 'design'  */
      injectReducer(store, { key: 'design', reducer })

      /*  Return getComponent   */
      cb(null, Design)

    /* Webpack named bundle   */
    }, 'design')
  }
})
