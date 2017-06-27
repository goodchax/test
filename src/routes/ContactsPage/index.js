'use strict'
import auth from '../../api/auth';

function redirectToDashboard(nextState, replace) {
  if (!auth.loggedIn()) {
    replace('/login')
  }
}

module.exports = {
  onEnter: redirectToDashboard,
  indexRoute: {
    onEnter: (nextState, replace) => {
      if (!auth.loggedIn()) {
        replace('/login')
      }
    }
  },
  path: 'contacts',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/DepartmentPage'));
    });
  }
}
