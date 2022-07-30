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
            type: "fillPosts",
            payload: data
        })
    }
}

export const clearPostData = () => {
    return (dispatch) => {
        dispatch({
            type: "clearPosts",
            payload: null
        })
    }
}

export const setCommentData = (data) => {
    return (dispatch) => {
        dispatch({
            type: "fillComment",
            payload: data
        })
    }
}

export const clearCommentData = () => {
    return (dispatch) => {
        dispatch({
            type: "clearComment",
            payload: null
        })
    }
}