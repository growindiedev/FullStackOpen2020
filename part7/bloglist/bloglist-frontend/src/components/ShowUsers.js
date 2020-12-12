import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'

import {getUsers} from '../reducers/usersReducer'


function ShowUsers() {
    const dispatch = useDispatch()
    dispatch(getUsers())

    const users = useSelector(state => state.usersReducer)
    const people = users.map((user, i) => <div key={i}>
                                    <Link style={{width: "200px", display: "inline-block"}} to={`/users/${user.id}`}>{user.username}</Link>
                                    <span>{user.blogs && user.blogs.length}</span>
                                    </div>)
    return (
        <div>
            <h3>Users</h3>
           {people}
        </div>
    )
}

export default ShowUsers


