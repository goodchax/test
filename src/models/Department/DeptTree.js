'use strict'
import {mapArrByModel} from '../modelUtils';

const DeptTree = (json = {}) => {
  return {
    deptid: json.deptid || 0,
    deptName: json.deptName || '',
    parentid: json.parentid || 0,
    subDeptNum: json.subDeptNum || 0,
    userNum: json.userNum || 0,
    department: json.department || []
  }
};

export default DeptTree;
