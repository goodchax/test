import {
  EMS_DEPT_TREE_SUCCESS,
  EMS_DEPT_GET_SUCCESS,
  EMS_DEPT_LIST_SUCCESS,
  EMS_DEPT_USER_LIST_SUCCESS,
} from '../constants/dept';

import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

import {mapArrByModel} from 'Models/modelUtils';
import DeptTree from 'Models/Department/DeptTree';
import DeptList from 'Models/Department/DeptList';
import UserList from 'Models/User/UserList';

const initialState = fromJS({
  depttree: [],
  dept: {},
  deptlist: [],
  users: {
    hasMore: true,
    userlist: []
  },
});

const actionFunc = {
  [EMS_DEPT_TREE_SUCCESS]: (state, action) => {
    return state.updateIn(["depttree"], v=>mapArrByModel(action.json.department, DeptTree))
  },
  [EMS_DEPT_LIST_SUCCESS]: (state, action) =>{
    return state.updateIn(["deptlist"], v=>mapArrByModel(action.json.department, DeptList))
  },
  [EMS_DEPT_GET_SUCCESS]: (state, action) => {
    return state.updateIn(["dept"], v=>action.json && action.json)
  },
  [EMS_DEPT_USER_LIST_SUCCESS]: (state, action) => {
    return state.updateIn(["users"], v=>action.json && UserList(action.json))
  },
};

export default createReducer(initialState, actionFunc);
