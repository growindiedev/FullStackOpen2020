import React from 'react'
import {createNote} from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
//import ConnectedFilter from './Filter'



function AnecdoteForm(props) {
    //const dispatch = useDispatch()
    //const anecdotes = useSelector(state => state)

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.create.value
        event.target.create.value = ''
        props.createNote(content)
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes
    }
}

const ConnectedAnecdoteForm = connect(mapStateToProps, {createNote})(AnecdoteForm)
export default ConnectedAnecdoteForm
