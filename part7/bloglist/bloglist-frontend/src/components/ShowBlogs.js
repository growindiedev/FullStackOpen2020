import React from 'react'
import Blog from './Blog'
import { useSelector} from 'react-redux'


const ShowBlogs = () => {

    const blogs = useSelector(state => state.blogsReducer)
    
    //const user = useSelector(state => state.userReducer)
    const user = useSelector(state => state.loginReducer)
    console.log('jerry', user)
    return (
    <div>
      
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
      
     blog.user && user.username && blog.user.username === user.username &&
        <Blog key={blog.id} blog={blog} />
      
      )}
    </div>)
  }

export default ShowBlogs
