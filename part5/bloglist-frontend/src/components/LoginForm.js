import React from 'react'

const LoginForm = ({render}) => {
    const {handleLogin, username, password, setUsername, setPassword} = render
    
    return (<form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={(event) => setUsername(event.target.value)}
        />
      </div>
  
      <div>
        password
        <input 
        type="text"
        value={password}
        name="Password"
        onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>)
  }

export default LoginForm
