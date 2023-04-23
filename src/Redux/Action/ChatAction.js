import axios from "axios"
import { ACCESS_CHAT_BY_ID_FAILED, ACCESS_CHAT_BY_ID_REQUEST, ACCESS_CHAT_BY_ID_SUCCESS, CLEAR_USER_SEARCH_RESULT, GET_USER_BY_SEARCH_FAILS, GET_USER_BY_SEARCH_REQUEST, GET_USER_BY_SEARCH_SUCCESS } from "../Constants/ChatConstants"

function config(token) {
    return { headers: { Authorization: `Bearer ${token}` } }
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
        await axios.post(`${process.env.REACT_APP_API_URL}/api/chat`, userId, config(token)).then((response) => {
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