import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import ShowBlogs from './components/ShowBlogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [error, setError] = useState(false)  

  useEffect(() => {
     const fetchData = async () => {
      const fetchedBlogs = await blogService.getAll()
      //setBlogs(fetchedBlogs.sort((a, b) => a.likes - b.likes))
      setBlogs(fetchedBlogs)
    }
     fetchData()  
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const man = await loginService.login({
      username, password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(man)
      )
      blogService.setToken(man.token)
      setUser(man)
      setUsername('')
      setPassword('')
    } catch(exception) {
      console.log(exception)
      setError(true)
      setErrorMessage('wrong user name or password')
      
    }  
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  if(user === null ){
    return (
      <div>
        <Notification message={errorMessage} error={error}/>
        <LoginForm render = {{handleLogin, username, password, setUsername, setPassword}}/>
      </div>
    )
  } 
  return (
    <div>
    <h2>blogs</h2>
    <Notification message={errorMessage} error={error}/>
    <p>{`${user.username} logged in`} <button onClick={handleLogout}>logout</button></p>
    <Togglable label1="create blog" label2="cancel">
    <BlogForm render = {{setError, setErrorMessage}} createBlog={blogService.create}/>
    </Togglable>
    <ShowBlogs render = {{blogs, user, handleLogout}}/>
   </div>
  )
}

export default App