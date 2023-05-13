import { ADD_NOTIFICATION_FAILED, ADD_NOTIFICATION_SUCCESS, DELETE_NOTIFICATION_FAILED, DELETE_NOTIFICATION_SUCCESS, GET_NOTIFICATION_FAILED, GET_NOTIFICATION_SUCCESS } from "../Constants/NotificationConstants";

export const GetNotificationReducer = (state = { notifications: [] }, action) => {
    switch (action.type) {
        case GET_NOTIFICATION_SUCCESS:
            return { notifications: action.payload };

        case GET_NOTIFICATION_FAILED:
            return { error: action.payload }

        default:
            return state;
    }
}

export const SaveNotificationReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_NOTIFICATION_SUCCESS:
            return { Savenotifications: action.payload };

        case ADD_NOTIFICATION_FAILED:
            return { Savenotificationserror: action.payload }

        default:
            return state;
    }
}

export const DeleteNotificationReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_NOTIFICATION_SUCCESS:
            return { Deletenotifications: action.payload };

        case DELETE_NOTIFICATION_FAILED:
            return { Deletenotificationserror: action.payload }

        default:
            return state;
    }
}