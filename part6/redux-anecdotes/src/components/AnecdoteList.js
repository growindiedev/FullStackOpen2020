import React from 'react'
import {createNote, vote} from '../reducers/anecdoteReducer'
import {createNotification, removeNotification} from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

function AnecdoteList() {

    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state.anecdoteReducer)
    const search = useSelector(state => state.filterReducer)


    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.filter(anecdote => anecdote.content.toLowerCase().indexOf(search.toLowerCase()) != -1).sort((a, b) => b.votes - a.votes).map(anecdote =>
            <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => {
              dispatch(vote(anecdote))
              dispatch(createNotification(anecdote.content))
              dispatch(removeNotification())
              
            }}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}

export default AnecdoteList
