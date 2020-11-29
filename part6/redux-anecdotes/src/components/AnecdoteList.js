import React from 'react'
import {vote} from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

function AnecdoteList() {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)


    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
            <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote))}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}

export default AnecdoteList
