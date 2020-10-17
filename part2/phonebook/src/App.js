import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import {getAll, create, update} from './services/phone'


const App = () => {

    

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [search, setSearch] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    getAll()
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response)
    })


  }, [])

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
    const result = persons.find(per => per.name === newName)
    if(result === undefined){
        const newPerson = {
            name: newName,
            number: newNumber
        }
        create(newPerson)
        .then(response => setPersons(persons.concat(response)))
        setNewName('') 

      } else if (result && newNumber) {
        const updated = {
          ...result,
          number: newNumber
        }

        window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`) &&
        update(result.id, updated).then(response => setPersons(persons.map(man => man.id !== result.id ? man : updated )))
      }
      
      else {
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
      <Persons props={{setPersons, persons, search}}/>
    </div>
  )
}

export default App