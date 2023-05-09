import { ACCESS_CHAT_BY_ID_FAILED, ACCESS_CHAT_BY_ID_REQUEST, ACCESS_CHAT_BY_ID_SUCCESS, CLEAR_USER_SEARCH_RESULT, CREATE_GROUP_CHAT_FAILED, CREATE_GROUP_CHAT_REQUEST, CREATE_GROUP_CHAT_SUCCESS, FETCH_CHAT_FAILD, FETCH_CHAT_REQUEST, FETCH_CHAT_SUCCESS, GET_USER_BY_SEARCH_FAILS, GET_USER_BY_SEARCH_REQUEST, GET_USER_BY_SEARCH_SUCCESS } from "../Constants/ChatConstants";

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
            return { AccessChatloading: false, Accesschats: action.payload }

        case ACCESS_CHAT_BY_ID_FAILED:
            return { AccessChatloading: false, AccessChaterror: action.payload }

        default:
            return state;
    }
}

export const FechChatsReducer = (state = { AllChats: [] }, action) => {
    switch (action.type) {
        case FETCH_CHAT_REQUEST:
            return { loading: true, AllChats: [] };

        case FETCH_CHAT_SUCCESS:
            return { loading: false, AllChats: action.payload }

        case FETCH_CHAT_FAILD:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}

export const CreateGroupReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_GROUP_CHAT_REQUEST:
            return { CreateGrouploading: true }

        case CREATE_GROUP_CHAT_SUCCESS:
            return { CreateGrouploading: false, CreateGroup: action.payload }

        case CREATE_GROUP_CHAT_FAILED:
            return { CreateGrouploading: false, CreateGroupError: action.payload }

        default:
            return state;
    }
}