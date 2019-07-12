import { createReducer } from 'redux-create-reducer'
import * as types from '../constants/chatActionTypes'

const initialState = {
	chatInfo: {
		cntUnreadChatting: 0,
		aryUnreadChatting: []
	}
}
export default function(state = initialState, action) {
    switch(action.type){
        case types.CHAT_NOTIFICATION:
            return {
                ...state,
                chatInfo:action.chatInfo
            }
        default:
            return state;
    }
}