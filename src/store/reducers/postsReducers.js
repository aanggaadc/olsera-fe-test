const reducer = (state = {
    title: "",
    body: ""
}, action) => {
    switch (action.type) {
        case "fill":
            return {
                title: action.payload.title,
                body: action.payload.body
            }
        case "clear":
            return {
                title: "",
                body: ""
            }
        default:
        return state
    }
}


export default reducer