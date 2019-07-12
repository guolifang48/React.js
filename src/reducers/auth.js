import * as types from '../constants/authActionTypes'

const initialState = {
    userinfo: {
        userid:"",
        username:"",
        password:"",
        message:"",
        isLogin:false,
        role:"",
    }
}

export default function(state = initialState, action) {
    switch(action.type){
        case types.CHANGE_USER_INFO:
            return {
                ...state,
                userinfo:action.userinfo
            }
        default:
            return state;
    }
}