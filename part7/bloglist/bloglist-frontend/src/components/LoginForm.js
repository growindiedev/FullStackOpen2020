import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setUsername, setPassword} from '../reducers/loginFormReducer'



const LoginForm = ({handleLogin}) => {
    const dispatch = useDispatch()
    const {username, password} = useSelector(state => state.loginFormReducer)
  

    return (<form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={(event) => dispatch(setUsername(event.target.value))}
        />
      </div>
  
      <div>
        password
        <input 
        type="text"
        value={password}
        name="Password"
        onChange={(event) => dispatch(setPassword(event.target.value))}
        />
      </div>
      <button type="submit">Submit</button>
    </form>)
  }

export default LoginForm
