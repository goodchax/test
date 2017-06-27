import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import {Iterable} from 'immutable';
import promiseMiddleware from '../api/promiseMiddleware';

const debug = process.env.NODE_ENV !== 'production';

export default function configureStore(history, initialState) {

  const stateTransformer = (state) => {
    let newState = {};
    Object.keys(state).forEach((x) => {
      if(Iterable.isIterable(state[x])) {
        newState[x] = state[x].toJS();
      } else {
        newState[x] = state[x];
      }
    });
    return newState;
  };

  let middlewares = [thunk, promiseMiddleware, routerMiddleware(history)];
  // if(debug) {
  //   middlewares.push(logger({stateTransformer}));
  // }

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares)
    )
  )

  if(module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    })
  }

  return store;
}
