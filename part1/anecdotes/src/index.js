import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])
  let ref = 0;

  const handleChange = () => {
    ref = Math.floor(Math.random() * anecdotes.length)
    setSelected(ref)}
  
  const handleVotes = () => {
    let copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>{`has ${votes[selected]} votes`}</p>
      <button onClick={handleChange}>next anecdote</button>
      <button onClick={handleVotes}>vote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
