import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from "redux-thunk"
// import { composeWithDevTools } from "redux-devtools-extension"
import { LoginReducer, RegistractionReducer } from './Reducer/UserReducer'
import { AccessChatByIdReducer, AddUserGroupReducer, CreateGroupReducer, CreateSingleChatMessageReducer, DeleteChatReducer, FechChatsReducer, GetSingleChatMessageReducer, GetUserBySearchReducer, RemoveGroupUserReducer, UpdateGroupNameReducer } from './Reducer/ChatReducer'
import { DeleteAllNotificationReducer, DeleteNotificationReducer, GetNotificationReducer, SaveNotificationReducer } from './Reducer/NotificationReducer'

const UserInfoFromStorage = localStorage.getItem("userInfo") ? localStorage.getItem("userInfo") : null
const UserTokenFromStorage = localStorage.getItem("Authtoken") ? localStorage.getItem("Authtoken") : null


const reducer = combineReducers({
    registerDetails: RegistractionReducer,
    loginDetails: LoginReducer,
    getUserBySearch: GetUserBySearchReducer,
    accessChatById: AccessChatByIdReducer,
    fetchChats: FechChatsReducer,
    createGroup: CreateGroupReducer,
    groupRename: UpdateGroupNameReducer,
    removeUser: RemoveGroupUserReducer,
    addUser: AddUserGroupReducer,
    deleteChat: DeleteChatReducer,
    allMessages: GetSingleChatMessageReducer,
    createMessage: CreateSingleChatMessageReducer,
    getNotification: GetNotificationReducer,
    addNotification: SaveNotificationReducer,
    deleteNotification: DeleteNotificationReducer,
    deleteAllNotification: DeleteAllNotificationReducer
})

const initialState = {
    loginDetails: { userInfo: { details: UserInfoFromStorage, token: UserTokenFromStorage } }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, applyMiddleware(...middleware))

export default store