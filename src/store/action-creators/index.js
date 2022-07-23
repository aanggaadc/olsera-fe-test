export const fillUser = (data) => {
    return (dispatch) => {
        dispatch({
            type: "login",
            payload: data
        })
    }
}

export const clearUser = () => {
    return (dispatch) => {
        dispatch({
            type: "logout",
            payload: null
        })
    }
}

export const setPostData = (data) => {
    return (dispatch) => {
        dispatch({
            type: "fill",
            payload: data
        })
    }
}

export const clearPostData = () => {
    return (dispatch) => {
        dispatch({
            type: "clear",
            payload: null
        })
    }
}