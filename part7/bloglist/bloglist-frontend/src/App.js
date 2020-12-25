import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Switch, Route} from 'react-router-dom'

import blogService from './services/blogs'

import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import ShowBlogs from './components/ShowBlogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import ShowUsers from './components/ShowUsers'
import Bloglist from './components/Bloglist'
import Blog from './components/Blog'
import Navbar from './components/Navbar'

import {getBlogs} from './reducers/blogsReducer'
import {setLogin} from './reducers/loginReducer'
import {setErrorMessage} from './reducers/errorMessageReducer'
import {setError} from './reducers/errorReducer'
import {getUsers} from './reducers/usersReducer'




const App = () => {

  const dispatch = useDispatch()
  const {username, password} = useSelector(state => state.loginFormReducer)


  useEffect(() => {
    const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (loggedUserJSON) {
      blogService.setToken(loggedUserJSON.token)
      
    }
  }, [])

  
 
  
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


  if(loggedUser === null ){
    return (
      <div>
        <Navbar user={loggedUser} />
        <Notification/>
        <LoginForm handleLogin = {handleLogin}/>
      </div>
    )
  } 
  return (
    <div>
    <Navbar user={loggedUser} />
    <Notification/>
    <h2>Blogs App</h2>
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

    <Route exact path="/blogs">
      <ShowBlogs/>
    </Route>

    <Route path="/blogs/:id">
      <Blog/>
    </Route>
    
    </Switch>
    
     </div>
  )
}

export default App