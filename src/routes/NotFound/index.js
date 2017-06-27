'use strict';



module.exports = {
  path: '/NotFound',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/NotFound'))
    })
  }
}
