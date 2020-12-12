import blogService from '../services/blogs'

export const getBlogs = () => {
    return async (dispatch) => {
        const content = await blogService.getAll()
        dispatch({
            type: "INIT",
            payload: content
        })
    }    
}

export const createBlog = (content) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(content)
        dispatch({
            type: "ADDBLOG",
            payload: newBlog
        })
    }
}

export const removeblog = (content) => {
    return async (dispatch) => {
        const deleted = await blogService.remove(content.id)
        dispatch({
            type: "REMOVEBLOG",
            payload: deleted.id
        })
    }
}

export const updateLike = (content) => {
    const updated = {
        ...content,
        likes: content.likes + 1
    }

    return async (dispatch) => {
        const updatedBlog = await blogService.update(updated.id, updated)
        dispatch({
            type: "UPDATELIKES",
            payload: updatedBlog.id
        })
    }
}

const reducer = (state = [], action) => {
    switch(action.type) {
        case "INIT": 
            return action.payload
        case "ADDBLOG":
            return state.concat(action.payload)
        case "UPDATELIKES": {
            const id = action.payload
            const likedBlog = state.find(blog => blog.id === id)

            const updatedBlog = {
                ...likedBlog,
                likes: likedBlog.likes + 1
                }
                return state.map(blog =>  blog.id !== id  ? blog : updatedBlog)
            }
        case "REMOVEBLOG": {
            const id = action.payload
            return state.filter(blog => blog.id !== id)
        }

        default:
            return state
    }
}

export default reducer