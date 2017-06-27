'use strict'

import {deptCenterApi} from '../axiosService';

export default {
  //获取部门树状图
  getDeptTree: () => {
    const params = {
      // sns_access_token
      deptid:0
    };
    return deptCenterApi('get', 'department/tree', params, null);
  },
  //获取部门列表
  getDeptList: (deptid) => {
    const params = {
      deptid
    };
    return deptCenterApi('get', 'department/list', params, null);
  },
  //获取部门详细
  getDept: (deptid) => {
    const params = {
      deptid
    };
    return deptCenterApi('get', 'department/get', params, null);
  },
  //创建部门
  createDept: (values) => {
    const data = {
      deptName: values.deptName,
      parentid: values.parentid
    };
    return deptCenterApi('post', 'department/create', null, data);
  },
  //修改部门
  updateDept: (values) => {
    const data = {
      deptid: values.deptid,
      deptName: values.deptName,
      parentid: values.parentid
    };
    return deptCenterApi('post', 'department/update', null, data);
  },
  //删除部门
  deleteDept: (deptid) => {
    const params = {
      deptid
    };
    return deptCenterApi('get', 'department/delete', params, null);
  }
}
