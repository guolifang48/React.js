import * as actionTypes from '../constants/authActionTypes';

export function change_user_info(userinfo) {
    return {
        type: actionTypes.CHANGE_USER_INFO,
        userinfo:userinfo
    }
}