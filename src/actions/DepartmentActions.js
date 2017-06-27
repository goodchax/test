'use strict'
import {
  EMS_DEPT_TREE,
  EMS_DEPT_LIST,
  EMS_DEPT_GET,
  EMS_DEPT_CREATE,
  EMS_DEPT_USER_LIST,
} from '../constants/dept';

import {showMsg, showErr} from './CommonActions';
import auth from '../api/auth';
import {COOKIE} from 'config';

import {mapArrByModel} from 'Models/modelUtils';
import Dept from 'Models/Department/Dept';
import UserList from 'Models/User/UserList';

import deptService from 'APIFolder/Department';
import userService from 'APIFolder/User';

const ONEWEEK = 60 * 60 * 24 * 7;
let cookiePath = {path: '/'};

//获取部门树状图
export const getDeptTree = () => {
  return (dispatch) => {
    return dispatch({
      type: EMS_DEPT_TREE,
      promise: deptService.getDeptTree()
    })
  };
}

//获取部门list
export const getDeptList = (deptid) => {
  return (dispatch) => {
    return dispatch({
      type: EMS_DEPT_LIST,
      promise: deptService.getDeptList(deptid)
    })
  }
}

//获取部门详细
export const getDept = (deptid) => {
  return (dispatch) => {
    return dispatch({
      type: EMS_DEPT_GET,
      promise: deptService.getDept(deptid)
    })
  }
}

export const getUserList = (values) => {
  // values['size'] = 20;
  return (dispatch) => {
    return dispatch({
      type: EMS_DEPT_USER_LIST,
      promise: userService.getUserList(values)
    })
  }
}

//获取父部门
export const getParent = (deptid, callback) => {
  return (dispatch) => {
    return deptService.getDept(deptid)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json, status}) => {
        if(status !== 'OK') {
          return dispatch(showMsg(json.errMsg || '操作失败'));
        }
        // dispatch(showMsg('操作成功', 'success'));
        callback && callback(Dept(json));
      })
      .catch(err => {
        console.log(err);
        return dispatch(showErr(err));
      })
  }
}

//创建部门
export const createDept = (values, callback) => {
  return (dispatch) => {
    return deptService.createDept(values)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json, status}) => {
        if(status !== 'OK') {
          return dispatch(showMsg(json.errMsg || '操作失败'));
        }
        dispatch(showMsg('操作成功', 'success'));
        callback && callback();
      })
      .catch(err => {
        console.log(err);
        return dispatch(showErr(err));
      })
  }
}

//修改部门
export const updateDept = (values, callback) => {
  return (dispatch) => {
    return deptService.updateDept(values)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json, status}) => {
        if(status !== 'OK') {
          return dispatch(showMsg(json.errMsg || '操作失败'));
        }
        dispatch(showMsg('操作成功', 'success'));
        callback && callback();
      })
      .catch(err => {
        console.log(err);
        return dispatch(showErr(err));
      })
  }
}

//删除部门
export const deleteDept = (deptid, callback) => {
  return (dispatch) => {
    return deptService.deleteDept(deptid)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json, status}) => {
        if (status !== 'OK') {
          return dispatch(showMsg(json.errMsg || '操作失败'));
        }
        dispatch(showMsg('操作成功', 'success'))
        callback && callback();
      })
      .catch(err => {
        return dispatch(showErr(err)());
      })
  }
}
