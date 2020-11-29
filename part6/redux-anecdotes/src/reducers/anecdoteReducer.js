export const vote = (anecdote) => {
  return {
    type: "VOTE",
    payload: anecdote
  }
}

export const createNote = (content) => {
  return {
    type: "ADD",
    payload: content
  }
}

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const initialState = anecdotesAtStart.map(anecdote => asObject(anecdote))

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case "VOTE": {
      const anecdote = {
        ...action.payload,
        votes: action.payload.votes + 1
      }
      const newState = state.filter(item => item.id !== action.payload.id).concat(anecdote)
      return newState
    }

    case "ADD": {
      const anecdote = asObject(action.payload)
      return state.concat(anecdote)
    }
      
  }

  return state
}

export default reducer