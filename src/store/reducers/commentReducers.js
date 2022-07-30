const reducer = (state = [], action) => {
    switch (action.type) {
        case "fillComment":
            return {
                state: action.payload
            }
        case "clearComment":
            return {
                state : []
            }
        default:
        return state
    }
}


export default reducer