import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { LoginReducer, RegistractionReducer } from './Reducer/UserReducer'

const UserInfoFromStorage = localStorage.getItem("userInfo") ? localStorage.getItem("userInfo") : null

const reducer = combineReducers({
    registerDetails: RegistractionReducer,
    loginDetails: LoginReducer
})

const initialState = {
    loginDetails: { userInfo: UserInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store