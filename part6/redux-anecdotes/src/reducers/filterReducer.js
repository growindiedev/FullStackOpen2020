export const search = (content) => {
    return {
      type: "SEARCH",
      payload: content
    }
  }


const reducer = (state = '', action) => {
    switch(action.type) {
        case "SEARCH" :
            return action.payload
        default: 
            return state
    }
}

export default reducer