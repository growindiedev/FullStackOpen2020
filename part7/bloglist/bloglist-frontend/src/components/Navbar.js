import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import {setUsername, setPassword} from '../reducers/loginFormReducer'
import {setLogout} from '../reducers/loginReducer'




function Navbar({user}) {
    const history = useHistory()
    const dispatch = useDispatch()

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedUser')
        dispatch(setLogout())
        history.push('/')
        dispatch(setUsername(''))
        dispatch(setPassword(''))
      }


    if(user){
        return (
        
            <nav>
                <ul>
                    <li>
                        <Link to="/blogs">Blogs</Link>
                    </li>
                    <li>
                        <Link to="/users">users</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span>{`${user.username} logged in`}</span>
                    </li>
                    <li>
                        <button onClick={handleLogout}>logout</button>
                    </li>
                </ul>
            </nav>
        
        )
    } else {
        return (
            <nav>
                <p>Login or Register as a new users</p>
            </nav>
        )
    }
    
}

export default Navbar
