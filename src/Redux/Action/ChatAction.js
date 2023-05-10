import axios from "axios"
import { ACCESS_CHAT_BY_ID_FAILED, ACCESS_CHAT_BY_ID_REQUEST, ACCESS_CHAT_BY_ID_SUCCESS, CLEAR_USER_SEARCH_RESULT, CREATE_GROUP_CHAT_FAILED, CREATE_GROUP_CHAT_REQUEST, CREATE_GROUP_CHAT_SUCCESS, FETCH_CHAT_FAILD, FETCH_CHAT_REQUEST, FETCH_CHAT_SUCCESS, GET_USER_BY_SEARCH_FAILS, GET_USER_BY_SEARCH_REQUEST, GET_USER_BY_SEARCH_SUCCESS, REMOVE_GROUP_USER_FAILED, REMOVE_GROUP_USER_REQUEST, REMOVE_GROUP_USER_SUCCESS, UPDATE_GROUP_NAME_FAILED, UPDATE_GROUP_NAME_REQUEST, UPDATE_GROUP_NAME_SUCCESS } from "../Constants/ChatConstants"

function config(token) {
    return { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
}

export const GetUserBySearchAction = (search) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_USER_BY_SEARCH_REQUEST })
        const { loginDetails: { userInfo: { token } } } = getState()
        await axios.get(`${process.env.REACT_APP_API_URL}/api/user?search=${search}`, config(token)).then(({ data }) => {
            if (data) {
                dispatch({ type: GET_USER_BY_SEARCH_SUCCESS, payload: data })
            }
        }).catch((error) => {
            dispatch({ type: GET_USER_BY_SEARCH_FAILS, payload: error.response.data })
        })
    } catch (error) {
        dispatch({ type: GET_USER_BY_SEARCH_FAILS, payload: error.response.data })
    }
}

export const ClearUserSearchAction = () => async (dispatch) => {
    try {
        dispatch({ type: CLEAR_USER_SEARCH_RESULT })
    } catch (error) {
        dispatch({ type: GET_USER_BY_SEARCH_FAILS, payload: error.response.data })
    }
}


export const AccessChatByIdAction = (userId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACCESS_CHAT_BY_ID_REQUEST })
        const { loginDetails: { userInfo: { token } } } = getState()
        await axios.post(`${process.env.REACT_APP_API_URL}/api/chat`, { userId }, config(token)).then((response) => {
            if (response) {
                dispatch({ type: ACCESS_CHAT_BY_ID_SUCCESS, payload: response.data })
            }
        }).catch((error) => {
            dispatch({ type: ACCESS_CHAT_BY_ID_FAILED, payload: error.response.data })
        })
    } catch (error) {
        dispatch({ type: ACCESS_CHAT_BY_ID_FAILED, payload: error.response.data })
    }
}

export const FetchChatsAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_CHAT_REQUEST })
        const { loginDetails: { userInfo: { token } } } = getState()
        await axios.get(`${process.env.REACT_APP_API_URL}/api/chat`, config(token)).then((response) => {
            if (response) {
                dispatch({ type: FETCH_CHAT_SUCCESS, payload: response.data })
            }
        }).catch((error) => {
            dispatch({ type: FETCH_CHAT_FAILD, payload: error.response.data })
        })
    } catch (error) {
        dispatch({ type: FETCH_CHAT_FAILD, payload: error.response.data })
    }
}

export const CreateGroupAction = (name, users) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_GROUP_CHAT_REQUEST })
        const { loginDetails: { userInfo: { token } } } = getState()
        await axios.post(`${process.env.REACT_APP_API_URL}/api/chat/group_settings`, { name, users: JSON.stringify(users) }, config(token)).then((response) => {
            if (response) {
                dispatch({ type: CREATE_GROUP_CHAT_SUCCESS, payload: response.data })
            }
        }).catch((error) => {
            dispatch({ type: CREATE_GROUP_CHAT_FAILED, payload: error.response.data })
        })

    } catch (error) {
        dispatch({ type: CREATE_GROUP_CHAT_FAILED, payload: error.message })
    }
}

export const RenameGroupAction = (chatId, chatName) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_GROUP_NAME_REQUEST })
        const { loginDetails: { userInfo: { token } } } = getState()
        await axios.put(`${process.env.REACT_APP_API_URL}/api/chat/group_settings`, { chatId, chatName }, config(token)).then((response) => {
            if (response) {
                dispatch({ type: UPDATE_GROUP_NAME_SUCCESS, payload: response.data })
            }
        }).catch((error) => {
            dispatch({ type: UPDATE_GROUP_NAME_FAILED, payload: error.response.data })
        })
    } catch (error) {
        dispatch({ type: CREATE_GROUP_CHAT_FAILED, payload: error.message })
    }
}

export const RemoveGroupUserAction = (chatId, userId) => async (dispatch, getState) => {
    try {
        dispatch({ type: REMOVE_GROUP_USER_REQUEST })
        const { loginDetails: { userInfo: { token } } } = getState()
        await axios.put(`${process.env.REACT_APP_API_URL}/api/chat/remove_user`, { chatId, userId }, config(token)).then((response) => {
            if (response) {
                dispatch({ type: REMOVE_GROUP_USER_SUCCESS, payload: response.data })
            }
        }).catch((error) => {
            dispatch({ type: REMOVE_GROUP_USER_FAILED, payload: error.response.data })
        })
    } catch (error) {
        dispatch({ type: REMOVE_GROUP_USER_FAILED, payload: error.message })
    }
}