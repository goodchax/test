/*
 *  Project : Channel
 *  Date    : 2016/11/30
 *  Author  : Melody Yuen
 *  Declare : home
 */

'use strict';
import {
  TEST
} from '../constants/home';
import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';

const initialState = fromJS({
  qrcodePv: 0,
  todayPv: 0,
  allPv: 0,
  yesterdayPv: 0,
  editorPv: 0,
  userCount: 0,
  adviserCount: 0,
  appCount: 0,
  qrcodeCount: 0,
  userTypeTop3: [],
  userDistribute: [],
  resourceProfile: [],
  isHaveWechat: 0,
  isFetching: false
});

const actionFunc = {

  //首页概览
  [TEST]: (state, action) => {
    return state.merge({isHaveWechat: action.json && action.json.count, isFetching: true})
  },
};

export default createReducer(initialState, actionFunc);