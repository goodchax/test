'use strict'
import {mapArrByModel} from '../modelUtils';

const DeptList = (json = {}) => {
  return {
    deptid: json.deptid || 0,
    deptName: json.deptName || '',
    parentid: json.parentid || 0,
    subDeptNum: json.subDeptNum || 0,
    userNum: json.userNum || 0,
  }
};

export default DeptList;
