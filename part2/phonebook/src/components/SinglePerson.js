import React, {useEffect} from 'react'
import {remove, getAll} from '../services/phone'




function SinglePerson({props}) {
    const {persons, per, setPersons, setErrorMessage, setError} = props;

    

    const handleChange = () => {
    window.confirm(`Delete ${per.name}?`)
         && remove(per.id).then(response => {
            const newPersons = persons.filter(man => man.id !== per.id)
            setError(false)
            setErrorMessage(
                
                `Deleted ${per.name}`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            setPersons(newPersons)
        }).catch( error =>
            {setErrorMessage(
                
                `Information of ${per.name} has already been removed from the server`
              )
              setError(true)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
        
    }

    return (
            <div >{per.name}{per.number} <button onClick={handleChange}> delete </button> </div>
       
    )
}

export default SinglePerson
