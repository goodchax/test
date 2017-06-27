'use strict'

import {userCenterApi} from '../axiosService';

export default {
  //获取部门列表
  getUserList: (values) => {
    const params = {
      deptid: values.deptid,
      size: values.size,
      offset: values.offset
    };
    return userCenterApi('get', 'user/list', params, null);
  },
}
