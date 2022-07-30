import {combineReducers} from 'redux'
import userReducers from './userReducers'
import postReducers from './postsReducers'
import commentReducers from './commentReducers'

const reducers = combineReducers({
    user: userReducers,
    post: postReducers,
    comment: commentReducers
})

export default reducers