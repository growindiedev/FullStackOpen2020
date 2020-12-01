import React from 'react'
import {createNote} from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'



function AnecdoteForm() {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.create.value
        event.target.create.value = ''
        dispatch(createNote(content))
      }
    
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="create"/></div>
                <button type="submit" >create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
