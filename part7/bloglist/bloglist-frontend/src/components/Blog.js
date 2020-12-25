import React, {useEffect} from 'react'
import Togglable from './Togglable'
import Comment from './Comment'
import {useDispatch, useSelector} from 'react-redux'
import {updateLike, removeblog} from '../reducers/blogsReducer'
import {getTheComments, createComment} from '../reducers/commentsReducer'
import {setComment} from '../reducers/comFormReducer'
import {getBlogs} from '../reducers/blogsReducer'
import {useParams} from 'react-router-dom'



const Blog = () => {
  const dispatch = useDispatch()
  const blogID = useParams().id

  const blogs = useSelector(state => state.blogsReducer)
  const cmt = useSelector(state => state.comFormReducer)

  const blog = blogs.find(b => b.id === blogID)
  console.log('blog', blog)

  const blogStyle = {
    padding: 15,
    border: 'solid',
    borderWidth: 1,
    margin: 10 
  }
 
  

const addComment = async (event) => {
  event.preventDefault();
  dispatch(createComment(blog.id, cmt))
}

useEffect(() => {
  dispatch(getBlogs())
}, [addComment])

const updateBlog = (event) => {
  event.preventDefault();
  dispatch(updateLike(blog))
}

const removeBlog = (event) => {
  event.preventDefault();
  window.confirm(`Remove blog ${blog.title} ${blog.author}`) &&
  dispatch(removeblog(blog))
}

      if (!blog) {
        return null
      }


  return (
    <div  className="Blog">
      <div style={blogStyle}>
        {`${blog.title} ${blog.author}`}
        <div className="hidden">{blog.url}</div>
        <div>{`${blog.likes} likes `}
        <button onClick={updateBlog}>Like</button></div>
        <div>{blog.author}</div>
        <div>{`Added by ${blog.user && blog.user.username}`}</div>
        <button onClick={removeBlog}>remove</button>
      </div>

      <div style={blogStyle}>
          <form onSubmit={addComment}>
            <h2>comments</h2>
            <input
            type="text"
            value={cmt}
            id="comment"
            name="comment"
            onChange={(event) => dispatch(setComment(event.target.value))}
        />
        <p>{cmt}</p>
        <button type="submit">Add Comment</button>
          </form>

          {blog.comments && blog.comments.length !== 0 ? (
          <ul>
          {blog.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
          </ul>
          ) : (
          <span>Add the first comment for this blog</span>
          )}


      </div>
    </div>
  )
}

export default Blog
