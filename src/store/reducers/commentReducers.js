const reducer = (state = {
    data: []
}, action) => {
    switch (action.type) {
        case "fillComment":
            return {
                data: action.payload
            }
        case "clearComment":
            return {
                data : []
            }
        default:
        return state
    }
}


export default reducer