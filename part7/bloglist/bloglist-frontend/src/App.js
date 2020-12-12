import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, Switch, Route, useParams, useHistory, Redirect} from 'react-router-dom'

import blogService from './services/blogs'

import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import ShowBlogs from './components/ShowBlogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import ShowUsers from './components/ShowUsers'
import Bloglist from './components/Bloglist'
import {getBlogs} from './reducers/blogsReducer'
import {setLogin, setLogout} from './reducers/loginReducer'
import {setUsername, setPassword} from './reducers/loginFormReducer'
import {setErrorMessage} from './reducers/errorMessageReducer'
import {setError} from './reducers/errorReducer'
import {getUsers} from './reducers/usersReducer'



const App = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogsReducer)

  const {username, password} = useSelector(state => state.loginFormReducer)

  useEffect(() => {
    const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (loggedUserJSON) {
      blogService.setToken(loggedUserJSON.token)
      
    }
    dispatch(getBlogs())
    dispatch(getUsers())
  }, [])

  const users = useSelector(state => state.usersReducer)

 

  //useEffect(() => dispatch(getBlogs()), [dispatch, loggedUser])
  
const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(setLogin({username, password}))
      await dispatch(setError(false))
      await dispatch(setErrorMessage('You are now logged in'))

    } catch(exception) {
      console.log(exception)
      await dispatch(setError(true))
      await dispatch(setErrorMessage('wrong user name or password'))
    }  
    setTimeout(() => {
       dispatch(setErrorMessage(null))
    }, 5000)
  }

  let loggedUser = useSelector(state => state.loginReducer)
  //console.log('loggedUser', loggedUser)

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    dispatch(setLogout())
    dispatch(setUsername(''))
    dispatch(setPassword(''))
  }

  if(loggedUser === null ){
    return (
      <div>
        <Notification/>
        <LoginForm handleLogin = {handleLogin}/>
      </div>
    )
  } 
  return (
    <div>
    <h2>blogs</h2>
    <Redirect to="/users"/>
    <Notification/>
    <p>{`${loggedUser.username} logged in`} <button onClick={handleLogout}>logout</button></p>
    <Togglable label1="create blog" label2="cancel">
    <BlogForm/>
    </Togglable>

    <Switch>

    <Route exact path="/users">
    <ShowUsers/>
    </Route>

    <Route  path="/users/:id">
      <Bloglist/>
    </Route>

    <Route  path="/blogs">
      <ShowBlogs/>
    </Route>


    </Switch>
    
     </div>
  )
}

export default App