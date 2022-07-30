const reducer = (state = {
    title: "",
    body: ""
}, action) => {
    switch (action.type) {
        case "fillPosts":
            return {
                title: action.payload.title,
                body: action.payload.body
            }
        case "clearPosts":
            return {
                title: "",
                body: ""
            }
        default:
        return state
    }
}


export default reducer