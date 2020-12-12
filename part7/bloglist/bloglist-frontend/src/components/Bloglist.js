import React from 'react'
import {useParams, useRouteMatch} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getUsers} from "../reducers/usersReducer"

function Bloglist() {
    const users = useSelector(state => state.usersReducer)
    const userID = useParams().id
    const user = users.find(user => user.id === userID)
    
    if(!user){
        return null
    }

    return (
        <>
       
       <h1>{user.username}</h1>
       <h2>Added blogs</h2>
       {user.blogs.length === 0 ? (
          <p>No blogs added yet.</p>
       ) : (
        <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            {blog.title}
          </li>
        ))}
        </ul>
       )} 
        </>
    )
}

export default Bloglist
