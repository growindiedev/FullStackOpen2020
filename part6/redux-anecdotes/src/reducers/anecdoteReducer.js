import anecdotes from '../services/anecdotes'
import anecdoteService from '../services/anecdotes'


export const vote = (anecdote) => {

  const updated = {
    ...anecdote,
    votes: anecdote.votes + 1
  }

  return async (dispatch) => {
    const content = await anecdoteService.update(updated.id, updated)
    dispatch({
      type: "VOTE",
      payload: content.id
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const content = await anecdoteService.getAll()
    dispatch({
      type: "INIT",
      payload: content
    })
  }
}

export const createNote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: "ADD",
      payload: newAnecdote
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case "VOTE": {

      const id = action.payload
      const votedAnecdote = state.find((anecdote) => anecdote.id === id);
      
      const updatedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      }

      //const newState = state.filter(item => item.id !== action.payload.id).concat(anecdote)
      return state.map((anecdote) =>
      anecdote.id !== id ? anecdote : updatedAnecdote
    );
  }

    case "ADD": {
      return state.concat(action.payload)
    }

    case "INIT": 
      return action.payload
      
  }

  return state
}

export default reducer