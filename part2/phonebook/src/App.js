import React, { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {

    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
      ])

  

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [search, setSearch] = useState('')

  const handleNameChange = (event) => {
      setNewName(event.target.value)
      
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
      setSearch(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.find(per => per.name === newName) === undefined){
        const newPerson = {
            name: newName,
            number: newNumber
        }
        setPersons([...persons, newPerson])
        setNewName('') 
      } else {
          alert(`${newName} is already in the phonebook`)
      }

      
      
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter props={{handleSearch}}/>
     <h2>add a new</h2>
      <PersonForm props={{addPerson, handleNameChange, handleNumberChange}}/>
      <h2>Numbers</h2>
      <Persons props={{persons, search}}/>
    </div>
  )
}

export default App