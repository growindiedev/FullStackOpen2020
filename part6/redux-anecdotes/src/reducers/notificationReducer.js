
export const createNotification = (content) => {
    return {
      type: "NOTIFY",
      payload: content
    }
  }

export const removeNotification = () => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch({type: "REMOVE"})
        }, 5000)
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