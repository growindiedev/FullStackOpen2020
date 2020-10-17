import React, {useEffect} from 'react'
import {remove, getAll} from '../services/phone'




function SinglePerson({props}) {
    const {persons, per, setPersons} = props;

    

    const handleChange = () => {
    window.confirm(`Delete ${per.name}?`)
         && remove(per.id).then(response => {
            const newPersons = persons.filter(man => man.id !== per.id)
            setPersons(newPersons)
        })
       
    }

    return (
            <div >{per.name}{per.number} <button onClick={handleChange}> delete </button> </div>
       
    )
}

export default SinglePerson
