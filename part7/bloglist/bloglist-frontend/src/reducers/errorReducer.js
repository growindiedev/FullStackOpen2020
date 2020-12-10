export const setError = (content) => {
    return {
        type: "ERR",
        payload: content
    }
}

const reducer = (state = false, action) => {
    switch(action.type) {
        case "ERR": 
            return action.payload
        default:
            return state
    }
}

export default reducer