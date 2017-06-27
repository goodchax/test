"use strict";

import { browserHistory } from 'react-router';
import configureStore from './configureStore';

let state = window.__INITIAL_STATE__ || {};

const store = configureStore(browserHistory, state);

export const getDispatch = () => {
  return store.dispatch;
};

export default store;
