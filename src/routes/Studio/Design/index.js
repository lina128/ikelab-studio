import { injectReducer } from '../../../store/reducers'
import { FETCH_EXPERIMENT, FETCH_EXPERIMENT_SUCCEEDED,
        SAVE_EXPERIMENT, SAVE_EXPERIMENT_SUCCEEDED } from './modules/design'
import undoable, { excludeAction } from 'redux-undo'
import { requireAuth } from '../../../containers/AppContainer'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Design = require('./containers/DesignContainer').default
      const reducer = undoable(require('./modules/design').default, {
        limit: 50,
        filter: excludeAction([
          FETCH_EXPERIMENT,
          FETCH_EXPERIMENT_SUCCEEDED,
          SAVE_EXPERIMENT,
          SAVE_EXPERIMENT_SUCCEEDED])
      })

      /*  Add the reducer to the store on key 'design'  */
      injectReducer(store, { key: 'design', reducer })

      /*  Return getComponent   */
      cb(null, Design)

    /* Webpack named bundle   */
    }, 'design')
  }
})
