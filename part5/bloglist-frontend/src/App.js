import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import ShowBlogs from './components/ShowBlogs'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [error, setError] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [blogs])

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
      console.log(man)
      console.log(blogs)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(man)
      )
      blogService.setToken(man.token)
      setUser(man)
      setUsername('')
      setPassword('')
      console.log(man)
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
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = (event) => {
    event.preventDefault()
    blogService.create(newBlog)
    setError(false)
    setErrorMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
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
    <BlogForm render = {{addBlog, newBlog, setNewBlog}}/>
    <ShowBlogs render = {{blogs, user, handleLogout}}/>
   </div>
  )
}

export default App