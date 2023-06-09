import { ACCESS_CHAT_BY_ID_FAILED, ACCESS_CHAT_BY_ID_REQUEST, ACCESS_CHAT_BY_ID_SUCCESS, CLEAR_USER_SEARCH_RESULT, CREATE_GROUP_CHAT_FAILED, CREATE_GROUP_CHAT_REQUEST, CREATE_GROUP_CHAT_SUCCESS, FETCH_CHAT_FAILD, FETCH_CHAT_REQUEST, FETCH_CHAT_SUCCESS, GET_USER_BY_SEARCH_FAILS, GET_USER_BY_SEARCH_REQUEST, GET_USER_BY_SEARCH_SUCCESS, UPDATE_GROUP_NAME_FAILED, UPDATE_GROUP_NAME_REQUEST, UPDATE_GROUP_NAME_SUCCESS, REMOVE_GROUP_USER_FAILED, REMOVE_GROUP_USER_REQUEST, REMOVE_GROUP_USER_SUCCESS, ADD_USER_GROUP_REQUEST, ADD_USER_GROUP_SUCCESS, ADD_USER_GROUP_FAILED, DELETE_CHAT_REQUEST, DELETE_CHAT_SUCCESS, DELETE_CHAT_FAILED, GET_SINGLE_CHAT_MASSGESS_REQUEST, GET_SINGLE_CHAT_MASSGESS_SUCCESS, GET_SINGLE_CHAT_MASSGESS_FAILED, CREATE_SINGLE_CHAT_MASSGESS_SUCCESS, CREATE_SINGLE_CHAT_MASSGESS_FAILED, CREATE_SINGLE_CHAT_MASSGESS_REQUEST } from "../Constants/ChatConstants";

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

export const UpdateGroupNameReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_GROUP_NAME_REQUEST:
            return { GroupRenameloading: true };

        case UPDATE_GROUP_NAME_SUCCESS:
            return { GroupRenameloading: false, GroupRename: action.payload }

        case UPDATE_GROUP_NAME_FAILED:
            return { GroupRenameloading: false, GroupRenameError: action.payload }

        default:
            return state;
    }
}

export const RemoveGroupUserReducer = (state = {}, action) => {
    switch (action.type) {
        case REMOVE_GROUP_USER_REQUEST:
            return { GroupUserUpdateloading: true }

        case REMOVE_GROUP_USER_SUCCESS:
            return { GroupUserUpdateloading: false, GroupUserUpdate: action.payload }

        case REMOVE_GROUP_USER_FAILED:
            return { GroupUserUpdateloading: false, GroupUserUpdateError: action.payload }

        default:
            return state;
    }
}

export const AddUserGroupReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_USER_GROUP_REQUEST:
            return { AddUserLoading: true };

        case ADD_USER_GROUP_SUCCESS:
            return { AddUserLoading: false, AddUser: action.payload }

        case ADD_USER_GROUP_FAILED:
            return { AddUserLoading: false, AddUserError: action.payload }

        default:
            return state;
    }
}

export const DeleteChatReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_CHAT_REQUEST:
            return { DeleteLoading: true };

        case DELETE_CHAT_SUCCESS:
            return { DeleteLoading: false, Delete: action.payload }

        case DELETE_CHAT_FAILED:
            return { DeleteLoading: false, DeleteError: action.payload }

        default:
            return state;
    }
}

export const GetSingleChatMessageReducer = (state = { messages: [] }, action) => {
    switch (action.type) {
        case GET_SINGLE_CHAT_MASSGESS_REQUEST:
            return { loading: true, messages: [] };

        case GET_SINGLE_CHAT_MASSGESS_SUCCESS:
            return { loading: false, messages: action.payload };

        case GET_SINGLE_CHAT_MASSGESS_FAILED:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}

export const CreateSingleChatMessageReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_SINGLE_CHAT_MASSGESS_REQUEST:
            return { Createmessagesloading: true };

        case CREATE_SINGLE_CHAT_MASSGESS_SUCCESS:
            return { Createmessagesloading: false, Createmessages: action.payload };

        case CREATE_SINGLE_CHAT_MASSGESS_FAILED:
            return { Createmessagesloading: false, Createmessageserror: action.payload };

        default:
            return state;
    }
}