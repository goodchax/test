'use strict'
import auth from '../../api/auth';
function redirectToDashboard(nextState, replace) {
  if (auth.loggedIn()) {
    replace('/index')
  }
}
module.exports = {
  onEnter: redirectToDashboard,
  indexRoute: {
    onEnter: (nextState, replace) => {
      if (auth.loggedIn()) {
        replace('/index')
      }
    }
  },
  path: 'login',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/LoginPage'));
    });
  }
}
