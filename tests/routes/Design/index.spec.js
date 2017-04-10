import DesignRoute from 'routes/Design'

describe('(Route) Design', () => {
  let _route

  beforeEach(() => {
    _route = DesignRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `design`', () => {
    expect(_route.path).to.equal('design')
  })
})
