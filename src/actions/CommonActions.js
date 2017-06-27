/*
 * Created on 2016-06-29 17:00
 *
 * By Susan Su
 */

'use strict';
import {
  SHOW_MSG,
  HIDE_MSG,
  TOGGLE_LOADING,
} from '../constants/common';

export const showMsg = (content, type = 'error')=> {
  return {
    type: SHOW_MSG,
    message: {
      content,
      type
    }
  }
};

export const hideMsg = ()=>({type: HIDE_MSG});

export const clearState = (path, dataName = "") => {
  let type = "";
  let reducerName = "";
  let keyPath = [];
  if(Array.isArray(path)) {
    reducerName = path.shift();
    keyPath = keyPath.concat(path);
  } else {
    reducerName = path;
  }
  switch (reducerName) {
    case "analysis":
      type = CLEAR_ANALYSIS_DATA;
      break;

    case "msgpush":
      type = CLEAR_MSGPUSH_DATA;
      break;

    case "rebate":
      type = CLEAR_REBATE_DATA;
      break;

    case "resource":
      type = CLEAR_RESOURCE_DATA;
      break;

    case "setting":
      type = CLEAR_SETTING_DATA;
      break;

    case "users":
      type = CLEAR_USERS_DATA;
      break;

    case "wechat":
      type = CLEAR_WECHAT_DATA;
      break;
  }
  if(type && dataName) {
    return {
      type,
      dataName,
      path: keyPath
    }
  }
};

// 控制Loading的状态
export const toggleLoading = (status = false) => {
  return {
    type: TOGGLE_LOADING,
    status
  }
};

//ShowErr
export const showErr = (err = '') => {
  return () => showMsg(err.errMsg || "服务器内部错误，请稍后再试！");
};

// return dispatch(showMsg(err.message || err.data.message || "服务器内部错误，请稍后再试！"));
