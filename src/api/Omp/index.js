'use strict'

import {ompService} from '../axiosService';

export default {
  login_with_pwd: (values) => {
    const data = {
      // sns_access_token,
      orgid: values.orgid,
      pwd: values.pwd
    };
    return ompService('post', 'omp/login_with_pwd', null, data);
  },

  get_corp_access_token: (code) => {
    const params = {
      tmp_login_code:code
    };
    return ompService('get', 'omp/get_corp_token', params, null);
  },

  get_org_admin: (sns_access_token) => {
    const params = {
      sns_access_token
    };
    return ompService('get', 'omp/get_org_admin', params, null);
  }

}
