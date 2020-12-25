export const setComment = (content) => {
    return {
        type: "COMMENT",
        payload: content
    }
}

const reducer = (state = '', action) => {
    switch(action.type) {
        case "COMMENT": 
            return action.payload
        default:
            return state
    }
}

export default reducer