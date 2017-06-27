/*
 * Created on 2016-07-21 17:13
 *
 * By Susan Su
 */

import { SHOW_MSG, HIDE_MSG, TOGGLE_LOADING } from '../constants/common';
import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialState = fromJS({
  msg: {
    type: '',
    content: ''
  },
  loading: false
});

export default createReducer(initialState, {

  [SHOW_MSG]: (state, action) => {
    return state.merge({
      msg: action.message
    })
  },
  [HIDE_MSG]: (state, action) => state.merge({
    msg: initialState.get('msg')
  }),

  //控制Loading的状态
  [TOGGLE_LOADING]: (state, {status}) => state.update('loading', v => status)
})
