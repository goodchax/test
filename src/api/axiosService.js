/*
 * Created on 2016-06-27 10:38
 *
 * By Susan Su
 */

'use strict';
require('es6-promise').polyfill();
import axios from 'axios';
import md5 from 'md5';
import {BASE_API_ROOT, app_key, app_secret} from 'config';

axios.defaults.baseURL = BASE_API_ROOT;
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
axios.interceptors.response.use(function(response) {
  const {data} = response;
  //receiveResponse(response.request.responseURL);
  if(response.status === 401) {
    //auth.logout();
    window.location.pathname = '/login';
  }
  if(data.errCode != 0) {
    return Promise.reject(data);
  }
  return response;
}, function(error) {
  //receiveResponse(error.request.responseURL);
  if(error.status === 401) {
    //auth.logout();
    window.location.pathname = '/login';
  }
  return Promise.reject(error);
});



function sign(params) {
  params = params == null ? {} : params;
  params['client_id'] = app_key;
  params['timestamp'] = Date.now();
  let keys = Object.getOwnPropertyNames(params);
  keys.sort();
  let query = app_secret;
  keys.map(key => {
    query += key;
    query += params[key];
  });
  query += app_secret;
  params['sign'] = md5(query).toLocaleUpperCase();
  return params;
}

function query(params) {
  const keys = Object.getOwnPropertyNames(params);
  let paramstr = '?';
  keys.map(key => {
    paramstr += (key + "=" + params[key] + "&");
  });
  return paramstr;
}

export const snsService = (method, api, params, data) => {
  params = sign(params);
  const paramstr = query(params);
  return axios[method](api+paramstr, data);
}

export const ompService = (method, api, params, data) => {
  params = sign(params);
  const paramstr = query(params);
  return axios[method](api+paramstr, data);
}

//部门api
export const deptCenterApi = (method, api, params, data) => {
  params = sign(params);
  const paramstr = query(params);
  return axios[method](api+paramstr, data);
}
//成员api
export const userCenterApi = (method, api, params, data) => {
  params = sign(params);
  const paramstr = query(params);
  return axios[method](api+paramstr, data);
}
