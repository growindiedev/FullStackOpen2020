const initialState = {
    title: '',
    author: '', 
    url: ''
}

export const setTitle = (content) => {
    return {
        type: "TITLE",
        payload: content
    }
}


export const setAuthor = (content) => {
    return {
        type: "AUTHOR",
        payload: content
    }
}


export const setUrl = (content) => {
    return {
        type: "URL",
        payload: content
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "TITLE": 
            return {
                ...state,
                title: action.payload
            }
        case "AUTHOR": 
            return {
                ...state,
                author: action.payload
            }
        case "URL": 
            return {
                ...state,
                url: action.payload
            }
        default:
            return state
    }
}

export default reducer