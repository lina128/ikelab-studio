export default (store) => ({
  path : 'print',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
      './components/PrintView'
    ], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const BluePrint = require('./components/PrintView').default

      /*  Return getComponent   */
      cb(null, BluePrint)

    /* Webpack named bundle   */
    }, 'designPrintView')
  }
})
