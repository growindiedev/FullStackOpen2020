import React from 'react'
import {vote} from '../reducers/anecdoteReducer'
import {createNotification} from '../reducers/notificationReducer'
import { connect } from 'react-redux'

function AnecdoteList(props) {

    //const dispatch = useDispatch()

    // const anecdotes = useSelector(state => state.anecdoteReducer)
    // const search = useSelector(state => state.filterReducer)

    return (
        <div>
            <h2>Anecdotes</h2>
            {props.anecdotes.filter(anecdote => anecdote.content.toLowerCase().indexOf(props.search.toLowerCase()) != -1).sort((a, b) => b.votes - a.votes).map(anecdote =>
            <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => {
              props.vote(anecdote)
              props.createNotification(`you voted '${anecdote.content}'`, 5)
             }}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdoteReducer,
    search: state.filterReducer
  }
}

const ConnectedAnecdotesList = connect(mapStateToProps, {createNotification, vote})(AnecdoteList)
export default ConnectedAnecdotesList
