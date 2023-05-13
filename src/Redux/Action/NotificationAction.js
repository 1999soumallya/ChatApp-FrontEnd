import axios from "axios"
import { ADD_NOTIFICATION_FAILED, ADD_NOTIFICATION_SUCCESS, DELETE_NOTIFICATION_FAILED, DELETE_NOTIFICATION_SUCCESS, GET_NOTIFICATION_FAILED, GET_NOTIFICATION_SUCCESS } from "../Constants/NotificationConstants"

function config(token) {
    return { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
}

export const GetNotificationAction = (userId) => async (dispatch, getState) => {
    try {
        const { loginDetails: { userInfo: { token } } } = getState()
        await axios.get(`${process.env.REACT_APP_API_URL}/api/message/?id=${userId}`, config(token)).then((response) => {
            if (response) {
                dispatch({ type: GET_NOTIFICATION_SUCCESS, payload: response.data })
            }
        }).catch((error) => {
            dispatch({ type: GET_NOTIFICATION_FAILED, payload: error.response.data })
        })
    } catch (error) {
        dispatch({ type: GET_NOTIFICATION_FAILED, payload: error.message })
    }
}

export const SaveNotificationAction = (MessageId, UserID) => async (dispatch, getState) => {
    try {
        const { loginDetails: { userInfo: { token } } } = getState()
        await axios.post(`${process.env.REACT_APP_API_URL}/api/message/notification`, { MessageId, UserID }, config(token)).then((response) => {
            if (response) {
                dispatch({ type: ADD_NOTIFICATION_SUCCESS, payload: response.data })
            }
        }).catch((error) => {
            dispatch({ type: ADD_NOTIFICATION_FAILED, payload: error.response.data })
        })
    } catch (error) {
        dispatch({ type: ADD_NOTIFICATION_FAILED, payload: error.message })
    }
}

export const DeleteNotificationAction = (notificationId) => async (dispatch, getState) => {
    try {
        const { loginDetails: { userInfo: { token } } } = getState()
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/message/notification?id=${notificationId}`, config(token)).then((response) => {
            if (response) {
                dispatch({ type: DELETE_NOTIFICATION_SUCCESS, payload: response.data })
            }
        }).catch((error) => {
            dispatch({ type: DELETE_NOTIFICATION_FAILED, payload: error.response.data })
        })
    } catch (error) {
        dispatch({ type: DELETE_NOTIFICATION_FAILED, payload: error.message })
    }
}