import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import blogsReducer from './reducers/blogsReducer'
import usersReducer from './reducers/usersReducer'
import errorMessageReducer from './reducers/errorMessageReducer'
import errorReducer from './reducers/errorReducer'
import blogFormReducer from './reducers/blogFormReducer'
import loginFormReducer from './reducers/loginFormReducer'
import loginReducer from './reducers/loginReducer'




const reducer = combineReducers({
    blogsReducer,
    errorMessageReducer,
    errorReducer,
    usersReducer,
    blogFormReducer,
    loginFormReducer,
    loginReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
