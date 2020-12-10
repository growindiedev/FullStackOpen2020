import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import blogsReducer from './reducers/blogsReducer'
import errorMessageReducer from './reducers/errorMessageReducer'
import errorReducer from './reducers/errorReducer'
import userReducer from './reducers/userReducer'
import blogFormReducer from './reducers/blogFormReducer'
import loginFormReducer from './reducers/loginFormReducer'
import loginReducer from './reducers/loginReducer'


const reducer = combineReducers({
    blogsReducer,
    errorMessageReducer,
    errorReducer,
    userReducer,
    blogFormReducer,
    loginFormReducer,
    loginReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
