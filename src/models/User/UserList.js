'use strict'
import UserListItem from 'Models/User/UserListItem';
import {mapArrByModel} from '../modelUtils';

const UserList = (json = {}) => {
  return {
    hasMore: json.hasMore || false,
    userlist: mapArrByModel(json.userlist, UserListItem) || [],
  }
};

export default UserList;
