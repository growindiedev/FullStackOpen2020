import React from 'react'
import Blog from './Blog'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import {getBlogs} from '../reducers/blogsReducer'


const ShowBlogs = () => {

    const dispatch = useDispatch()
    dispatch(getBlogs())
    const blogs = useSelector(state => state.blogsReducer)
    const user = useSelector(state => state.loginReducer)
    console.log('jerry', user)

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginTop: 5,
      marginBottom: 5
    }
    // blog.user.username === user.username &&
    return (
      <div>
      {
    // <div>
      
    //   {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
      
    //  blog.user && user.username && blog.user.username === user.username &&
    //     <Blog key={blog.id} blog={blog} />
      
    //   )}
    // </div>
      }

        {
        
        blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        blog.user && user.username && 
        <div style={blogStyle}><Link to={`/blogs/${blog.id}`}>{`${blog.title }${blog.author }`}</Link></div>
        
        )}




      </div>
      
    )
  }

export default ShowBlogs
