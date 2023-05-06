export const getSender = (currentuser, users) => {
    users = users.filter((items) => items._id !== currentuser.id)
    return users[0].name
}