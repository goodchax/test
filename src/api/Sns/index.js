'use strict'

import {snsService} from '../axiosService';

export default {
  signin: (values) => {
    const data = {
      type: 'mobile',
      value: values.username,
      password: values.password,
      lastLoginIp: '127.0.0.3'
    };
    return snsService('post', 'sns/signin', null, data);
  },

  getToken: (code) => {
    const params = {
      code
    };
    return snsService('get', 'sns/get_sns_token', params, null);
  },

  getUserInfo: (token) => {
    const params = {
      sns_token: token
    };
    return snsService('get', 'sns/getuserinfo', params, null);
  }

}
