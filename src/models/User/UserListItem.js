'use strict'
import {mapArrByModel} from '../modelUtils';

const UserList = (json = {}) => {
  return {
    createTime: json.createTime || '',
    email: json.email || 0,
    hide: json.hide || 0,
    jobnumber: json.jobnumber || 0,
    mobile: json.mobile || 0,
    name: json.name || 0,
    orgid: json.orgid || 0,
    position: json.position || 0,
    remark: json.remark || 0,
    senior: json.senior || 0,
    tel: json.tel || 0,
    updateTime: json.updateTime || 0,
    userid: json.userid || 0,
    workPlace: json.workPlace || 0,
  }
};

export default UserList;
