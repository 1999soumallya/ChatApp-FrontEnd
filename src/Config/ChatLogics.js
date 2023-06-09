export const getSender = (currentuser, users) => {
    return users[0]._id === currentuser.id ? users[1].name : users[0].name
}

export const getReciver = (currentuser, users) => {
    return users[0]._id === currentuser.id ? users[1]._id : users[0]._id
}

export const getSenderDetails = (currentuser, users) => {
    return users[0]._id === currentuser.id ? users[1] : users[0]
}

export const isSameSender = (messages, m, i, userId) => {
    return (
        (i < messages.length - 1) && (
            (messages[i + 1].sender._id !== m.sender._id) || (messages[i + 1].sender._id === undefined)
        ) && messages[i].sender._id !== userId
    )
}

export const isLastMessage = (messages, i, userId) => {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    )
}