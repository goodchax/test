'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, applyRouterMiddleware, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import useScroll from 'react-router-scroll';
import {createHistory, createHashHistory} from 'history';
// import  from 'history';
import store from './store';
import routes from './routes';

//const createHistory = process.env.NODE_ENV !== 'production' ? createBrowserHistory : createHashHistory;


const appHistory = useRouterHistory(createHistory)();
const history = syncHistoryWithStore(appHistory, store);

import App from './components/App';

ReactDOM.render(
    <Provider store={store}>
      <Router history={history} routes={routes}>
      </Router>
    </Provider>
    ,document.getElementById('App')
)
