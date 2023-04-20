import axios from "axios"
import { GET_USER_BY_SEARCH_FAILS, GET_USER_BY_SEARCH_REQUEST, GET_USER_BY_SEARCH_SUCCESS } from "../Constants/ChatConstants"

const config = { headers: { Authorization: `Bearer ${localStorage.getItem("Authtoken")}` } }

export const GetUserBySearchAction = (search) => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_BY_SEARCH_REQUEST })
        await axios.get(`${process.env.REACT_APP_API_URL}/api/user?search=${search}`, config).then(({ data }) => {
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