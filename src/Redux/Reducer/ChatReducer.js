import { GET_USER_BY_SEARCH_FAILS, GET_USER_BY_SEARCH_REQUEST, GET_USER_BY_SEARCH_SUCCESS } from "../Constants/ChatConstants";

export const GetUserBySearchReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case GET_USER_BY_SEARCH_REQUEST:
            return { loading: true, ...state }

        case GET_USER_BY_SEARCH_SUCCESS:
            return { loading: false, users: action.payload }

        case GET_USER_BY_SEARCH_FAILS:
            return { loading: false, error: action.payload }

        default:
            return state;
    }
}