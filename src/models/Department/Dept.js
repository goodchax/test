'use strict'

const Dept = (json = {}) => {
  return {
    deptid: json.id || 0,
    deptName: json.deptName || '',
    parentid: json.parentid || 0,
    subDeptNum: json.parentid || 0,
    userNum: json.userNum || 0,
  }
};

export default Dept;
