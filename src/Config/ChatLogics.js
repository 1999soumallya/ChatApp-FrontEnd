export const getSender = (currentuser, users) => {
    return users[0]._id === currentuser._id ? users[1].name : users[0].name
}

export const getSenderDetails = (currentuser, users) => {
    return users[0]._id === currentuser._id ? users[1] : users[0]
}