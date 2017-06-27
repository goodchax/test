import {showMsg} from 'ActionsFolder/CommonActions';
import {getDept} from 'ActionsFolder/DepartmentActions';
// import { message } from 'antd';

export default function promiseMiddleware() {
  return next => action => {
    const { promise, type, isFetching, ...rest } = action;

    if (!promise) return next(action);

    const SUCCESS = type + '_SUCCESS';
    const REQUEST = type + '_REQUEST';
    const FAILURE = type + '_FAILURE';

    next({ ...rest, isFetching: true, type: REQUEST });

    return promise
        .then(response => ({json: response.data, status: response.statusText}))
        .then(({json,status}) => {
          next({ ...rest, json, isFetching: false, type: SUCCESS });
          return false;
        })
        .catch(error => {
          next({ ...rest, error, isFetching: false, type: FAILURE });
          next(showMsg("服务器内部错误，请稍后再试！"));
          return false;
        })
  }
}
