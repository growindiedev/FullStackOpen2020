import userService from '../services/users'


export const register = (credentials) => {
    return async (dispatch) => {
        const registeredUser = await userService.registerUser(credentials)
        dispatch({
            type: "REGISTER",
            payload: registeredUser
        })
    }
}

export const getUsers = () => {
    return async (dispatch) => {
        const content = await userService.getAll()
        dispatch({
            type: "INIT",
            payload: content
        })
    }
}

const reducer = (state = [], action) => {

    switch (action.type) {
        case "REGISTER": 
            return state.concat(action.payload)
        case "INIT":
            return action.payload
        default:
            return state
        
    }
}

export default reducer


