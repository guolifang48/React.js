import * as actionTypes from '../constants/chatActionTypes'

export function reset_chat_notification(chatInfo) {
    return {
     	type: actionTypes.CHAT_NOTIFICATION,
        chatInfo:chatInfo
    }
}