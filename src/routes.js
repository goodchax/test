// import auth from './api/auth';
// import usercenterapi from './api/UserCenter';
import cookie from 'react-cookie';
import {COOKIE} from 'config';
import auth from './api/auth';

function redirectToIndex(nextState, replace) {
    // if(!auth.loggedIn()) {
    //   replace({
    //     pathname: '/login',
    //     state: {nextPathname: nextState.location.pathname}
    //   })
    // } else {
    //   replace({
    //     pathname: "/index"
    //   })
    // }
    replace({
      pathname: "/index"
    })
}


export default {
  path: "/",
  indexRoute: {onEnter: redirectToIndex},
  components: require('./components/App'),
  childRoutes: [
    require('./routes/IndexPage'),
    require('./routes/ContactsPage'),
    require('./routes/NotFound'),
    require('./routes/LoginPage'),
    // require('./routes/RegisterPage'),
    // require('./routes/ManagePage'),
    // require('./routes/PasswordFind'),
    // require('./routes/BindWechatPage'),
    // require('./routes/NotFound')
  ]
}
