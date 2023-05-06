import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { LoginReducer, RegistractionReducer } from './Reducer/UserReducer'
import { AccessChatByIdReducer, FechChatsReducer, GetUserBySearchReducer } from './Reducer/ChatReducer'

const UserInfoFromStorage = localStorage.getItem("userInfo") ? localStorage.getItem("userInfo") : null
const UserTokenFromStorage = localStorage.getItem("Authtoken") ? localStorage.getItem("Authtoken") : null


const reducer = combineReducers({
    registerDetails: RegistractionReducer,
    loginDetails: LoginReducer,
    getUserBySearch: GetUserBySearchReducer,
    accessChatById: AccessChatByIdReducer,
    fetchChats: FechChatsReducer
})

const initialState = {
    loginDetails: { userInfo: { details: UserInfoFromStorage, token: UserTokenFromStorage } }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store