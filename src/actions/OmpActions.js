'use strict'
import {
  SIGNIN,
  SIGNIN_SUCCESS,
  OMP_ORG_ADMIN_LIST
} from '../constants/common';

import auth from '../api/auth';
import {COOKIE} from 'config';



import snsService from 'APIFolder/Sns';
import ompService from 'APIFolder/Omp';

const ONEWEEK = 60 * 60 * 24 * 7;
let cookiePath = {path: '/'};


export const signin = (user, callback) => {
  return (dispatch) => {
    return snsService.signin(user)
      //.then(response => ({json: response.data, status: response.statusText}))
      .then(function(response) {
        return {json: response.data, status: response.statusText};
      })
      .then(({json, status}) => {
        if (status !== 'OK') {
          callback && callback(true, '登录失败');
        }
        if (json.errCode == 0) {
          const {login_tmp_code} = json;
          if (login_tmp_code) {
            dispatch(get_sns_token(login_tmp_code));
          }
          // callback && callback(true, '错误的数据格式');
        }
      }).catch(err=> {
        //登录异常
        callback && callback(true, err.errMsg || "服务器内部错误，请稍后再试！");
      });
  };
}

export const get_sns_token = (code)=> {
  return (dispatch) => {
    return snsService.getToken(code)
      .then(function(response) {
        return {json: response.data, status: response.statusText};
      })
      .then(({json, status}) => {
        if (status !== 'OK') {
        }
        if (json.errCode == 0) {
          const {sns_access_token} = json;
          // auth.saveCookie(COOKIE, sns_access_token);
          dispatch(get_org_admin(sns_access_token));
        }
      })
  }
};

export const get_org_admin = (sns_access_token) => {
  return (dispatch) => {
    return ompService.get_org_admin(sns_access_token)
    .then(function(response) {
      return {json: response.data, status: response.statusText};
    }).then(function({json, status}) {
      if (status !== 'OK') {
      }
      if (json.errCode == 0) {
        const {orgAdmin} = json;
        dispatch({type: OMP_ORG_ADMIN_LIST, orgAdmin})
      }
    });
  }
}

export const login_with_pwd = (values, callback) => {
  return (dispatch) => {
    return ompService.login_with_pwd(values)
    .then(function(response) {
      return {json: response.data, status: response.statusText};
    }).then(function({json, status}) {
      if (status !== 'OK') {
        // console.log('status', status);
        callback && callback(true, "网络异常");
      }
      if (json.errCode == 0) {
        callback && callback(false, json);
      }
    }).catch(err=> {
      //登录异常
      callback && callback(true, err.errMsg || "服务器内部错误，请稍后再试！");
    });
  }
}


export const get_corp_token = (code, callback)=> {
  return (dispatch) => {
    return ompService.get_corp_access_token(code)
      .then(function(response) {
        return {json: response.data, status: response.statusText};
      })
      .then(({json, status}) => {
        if (status !== 'OK') {
        }
        if (json.errCode == 0) {
          const {corp_access_token} = json;
          //console.log('sns_access_token:', sns_access_token);
          auth.saveCookie(COOKIE, corp_access_token);
          //dispatch(get_org_admin(sns_access_token));
          callback && callback(false, corp_access_token);
        }
      })
  }
};
