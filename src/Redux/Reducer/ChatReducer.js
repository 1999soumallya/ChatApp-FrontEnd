import { ACCESS_CHAT_BY_ID_FAILED, ACCESS_CHAT_BY_ID_REQUEST, ACCESS_CHAT_BY_ID_SUCCESS, CLEAR_USER_SEARCH_RESULT, GET_USER_BY_SEARCH_FAILS, GET_USER_BY_SEARCH_REQUEST, GET_USER_BY_SEARCH_SUCCESS } from "../Constants/ChatConstants";

export const GetUserBySearchReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case GET_USER_BY_SEARCH_REQUEST:
            return { loading: true, users: [] }

        case GET_USER_BY_SEARCH_SUCCESS:
            return { loading: false, users: action.payload }

        case GET_USER_BY_SEARCH_FAILS:
            return { loading: false, error: action.payload }

        case CLEAR_USER_SEARCH_RESULT:
            return { users: [] }

        default:
            return state;
    }
}

export const AccessChatByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case ACCESS_CHAT_BY_ID_REQUEST:
            return { AccessChatloading: true };

        case ACCESS_CHAT_BY_ID_SUCCESS:
            return { AccessChatloading: false, chats: action.payload }

        case ACCESS_CHAT_BY_ID_FAILED:
            return { AccessChatloading: false, AccessChaterror: action.payload }

        default:
            return state;
    }
}