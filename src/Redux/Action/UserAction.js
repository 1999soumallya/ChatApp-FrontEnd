import axios from "axios"
import { USER_LOGIN_FAILED, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_FAILED, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, config } from "../Constants/AuthConstants"
import { Encrypt } from "../../SequrityFunction"

export const RegistractionAction = (details) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        await axios.post(`${process.env.REACT_APP_API_URL}/api/user`, details, config).then(async ({ data }) => {
            dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
            data.details = Encrypt(data.details)
            localStorage.setItem("userInfo", data.details)
            localStorage.setItem("Authtoken", data.token)
        }).catch((error) => {
            dispatch({ type: USER_REGISTER_FAILED, payload: error.response.data })
        })
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAILED, payload: error.response && error.response.data })
    }
}

export const LoginAction = (details) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        await axios.post(`${process.env.REACT_APP_API_URL}/api/user/login`, details, config).then(({ data }) => {
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
            data.details = Encrypt(data.details)
            localStorage.setItem("userInfo", data.details)
            localStorage.setItem("Authtoken", data.token)
        }).catch((error) => {
            dispatch({ type: USER_LOGIN_FAILED, payload: error.response.data })
        })
    } catch (error) {
        dispatch({ type: USER_LOGIN_FAILED, payload: error.response && error.response.data })
    }
}