import loginService from '../services/login'
import blogService from '../services/blogs'


const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedUser'))

const initialState = loggedUserJSON ? loggedUserJSON : null

export const setLogin = (credentials) => {
    return async (dispatch) => {
        const user = await loginService.login(credentials)
        await blogService.setToken(user.token)
        window.localStorage.setItem(
            'loggedUser', JSON.stringify(user)
          )
        dispatch({
            type: "LOGIN",
            payload: user
        })
    }
}

export const setLogout = () => {
    window.localStorage.removeItem('loggedUser')
    return {
        type: "LOGOUT"
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "LOGIN":
            return action.payload
        case "LOGOUT":
            return null
        default: 
            return state
    }
}

export default reducer