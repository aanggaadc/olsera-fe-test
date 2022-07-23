const reducer = (state = {
    id: "",
    email: ""
}, action) => {
    switch (action.type) {
        case "login":
            return {
                id: action.payload.id,
                email: action.payload.email
            }
        case "logout":
            return {
                id: "",
                email: ""
            }
        default:
        return state
    }
}


export default reducer