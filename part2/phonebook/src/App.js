import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import {getAll, create, update} from './services/phone'


const App = () => {

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [search, setSearch] = useState('')
  const [persons, setPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [error, setError] = useState(false)


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
        setError(false)
        setErrorMessage(
            
          `Added ${newPerson.name}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

      } else if (result && newNumber) {
        const updated = {
          ...result,
          number: newNumber
        }

        window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`) &&
        update(result.id, updated).then(response => setPersons(persons.map(man => man.id !== result.id ? man : updated )))
        setError(false)
        setErrorMessage(
          
          `updated ${newName} number`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      
      else {
          alert(`${newName} is already in the phonebook`)
      }

  }


  return (
    <div>
      <Notification message={errorMessage} error={error}/>
      <h2>Phonebook</h2>
      <Filter props={{handleSearch}}/>
     <h2>add a new</h2>
      <PersonForm props={{addPerson, handleNameChange, handleNumberChange}}/>
      <h2>Numbers</h2>
      <Persons props={{setPersons, persons, search, setErrorMessage, setError}}/>
    </div>
  )
}

export default App