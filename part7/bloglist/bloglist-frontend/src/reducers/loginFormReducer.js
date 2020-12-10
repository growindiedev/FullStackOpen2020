const initialState = {
    username: '',
    password: ''
}

export const setUsername = (content) => {
    return {
        type: "USERNAME",
        payload: content
    }
}

export const setPassword = (content) => {
    return {
        type: "PASSWORD",
        payload: content
    }
}



const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "USERNAME": 
            return {
                ...state,
                username: action.payload
            }
        case "PASSWORD": 
            return {
                ...state,
                password: action.payload
            }
        
        default:
            return state
    }
}

export default reducer