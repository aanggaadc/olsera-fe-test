import {combineReducers} from 'redux'
import userReducers from './userReducers'
import postReducers from './postsReducers'

const reducers = combineReducers({
    user: userReducers,
    post: postReducers
})

export default reducers