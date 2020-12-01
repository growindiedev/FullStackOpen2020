
export const createNotification = (content, delay) => {
    return (dispatch) => {
        dispatch({
            type: "NOTIFY",
            payload: content
        })
        setTimeout(() => {
            dispatch({type: "REMOVE"})
        }, delay * 1000)
    }
}

const reducer = (state = 'NOTIFICATION', action) => {
    switch (action.type) {
        case "NOTIFY": 
            return action.payload
        case "REMOVE": {
            return null 
        }
            
        default: 
            return state
    }
}


export default reducer