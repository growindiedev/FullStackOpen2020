import blogService from '../services/blogs'

export const getTheComments = () => {
    return async (dispatch) => {
        const content = await blogService.getComments()
        dispatch({
            type: "INIT",
            payload: content
        })
    }    
}

export const createComment = (id, content) => {
    return async (dispatch) => {
        const newComment = await blogService.addComment(id, content)
        console.log('createComment', newComment)
        dispatch({
            type: "ADDCOMMENT",
            payload: newComment
        })
    }
}

const reducer = (state = [], action) => {
    switch(action.type) {
        case "INIT": 
            return action.payload
        case "ADDCOMMENT":
            return state.concat(action.payload)
        default:
            return state
        }
}

export default reducer