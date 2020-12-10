export const setErrorMessage = (content) => {
    return {
        type: "ERRORMSG",
        payload: content
    }
}

const reducer = (state = null, action) => {
    switch(action.type) {
        case "ERRORMSG": 
            return action.payload
        default:
            return state
    }
}

export default reducer