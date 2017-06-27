'use strict';
import {combineReducers} from 'redux';
import common from './common';
import home from './home';
import omp from './omp';
import dept from './dept';
import {routerReducer as routing} from 'react-router-redux';

const rootReducer = combineReducers({
	routing,
	common,
	home,
	omp,
	dept
});

export default rootReducer;
