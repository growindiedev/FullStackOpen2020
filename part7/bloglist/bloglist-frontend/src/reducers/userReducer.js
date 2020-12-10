export const setUser = (content) => {
    return {
        type: "USER",
        payload: content
    }
}


const reducer = (state = null, action) => {
    switch(action.type) {
        case "USER": 
            return action.payload
        
        default:
            return state
    }
}

export default reducer