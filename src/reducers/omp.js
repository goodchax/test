import {OMP_ORG_ADMIN_LIST} from '../constants/common';

import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialState = fromJS({
  step: 'sns_login',
  orgAdmin: [],
});

const actionFunc = {
  [OMP_ORG_ADMIN_LIST]: (state, action) => {
    console.log('state', state);
    console.log('action', action);
    console.log('sign success');
    return fromJS({step: 'corp_login', orgAdmin: action.orgAdmin});
  }
};

export default createReducer(initialState, actionFunc);
