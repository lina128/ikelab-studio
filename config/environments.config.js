// Here is where you can define configuration overrides based on the execution environment.
// Supply a key to the default export matching the NODE_ENV that you wish to target, and
// the base configuration will apply your overrides before exporting itself.
module.exports = {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  // NOTE: In development, we use an explicit public path when the assets
  // are served webpack by to fix this issue:
  // http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
  development : (config) => ({
    compiler_public_path : 'http://studio.ikehive.com-dev.s3-website-us-east-1.amazonaws.com/',
    globals: Object.assign({}, config.globals, {
      BASEURI: JSON.stringify('http://app2.com:1234'),
      CREATE_EXPERIMENT_URL: JSON.stringify('http://localhost:4040'),
      FETCH_EXPERIMENTS_URL: JSON.stringify('http://localhost:5050'),
      FETCH_EXPERIMENT_URL: JSON.stringify('http://localhost:7070'),
      SAVE_EXPERIMENT_URL: JSON.stringify('http://localhost:6060'),
      IKELAB_IMAGES_STORE: JSON.stringify('https://s3.amazonaws.com/ikelab-images-store-dev'),
      IKELAB_IMAGES: JSON.stringify('https://gyuijdy1mb.execute-api.us-east-1.amazonaws.com/dev')
    })
  }),

  // ======================================================
  // Overrides when NODE_ENV === 'stg'
  // ======================================================
  stg : (config) => ({
    compiler_public_path : 'http://studio.ikehive.com-dev.s3-website-us-east-1.amazonaws.com/',
    globals: Object.assign({}, config.globals, {
      BASEURI: JSON.stringify('http://app2.com:1234'),
      CREATE_EXPERIMENT_URL : JSON.stringify('https://agvzj6my61.execute-api.us-east-1.amazonaws.com/stg/experiment'),
      FETCH_EXPERIMENTS_URL : JSON.stringify('https://agvzj6my61.execute-api.us-east-1.amazonaws.com/stg/experiments'),
      FETCH_EXPERIMENT_URL : JSON.stringify('https://agvzj6my61.execute-api.us-east-1.amazonaws.com/stg/experiment'),
      SAVE_EXPERIMENT_URL : JSON.stringify('https://agvzj6my61.execute-api.us-east-1.amazonaws.com/stg/experiment'),
      IKELAB_IMAGES_STORE : JSON.stringify('https://s3.amazonaws.com/ikelab-images-store-dev'),
      IKELAB_IMAGES : JSON.stringify('https://gyuijdy1mb.execute-api.us-east-1.amazonaws.com/dev')
    })
  }),

  // ======================================================
  // Overrides when NODE_ENV === 'prod'
  // ======================================================
  prod : (config) => ({
    compiler_public_path     : '/',
    compiler_fail_on_warning : false,
    compiler_hash_type       : 'chunkhash',
    compiler_devtool         : null,
    compiler_stats           : {
      chunks       : true,
      chunkModules : true,
      colors       : true
    },
    globals: Object.assign({}, config.globals, {
      BASEURI: JSON.stringify('http://app2.com:1234'),
      CREATE_EXPERIMENT_URL : 'http://localhost:4040',
      FETCH_EXPERIMENTS_URL : 'http://localhost:5050',
      FETCH_EXPERIMENT_URL : 'http://localhost:7070',
      SAVE_EXPERIMENT_URL : 'http://localhost:6060',
      IKELAB_IMAGES_STORE : 'https://s3.amazonaws.com/ikelab-images-store-prod',
      IKELAB_IMAGES : 'https://u63flidw69.execute-api.us-east-1.amazonaws.com/prod'
    })
  })
}
