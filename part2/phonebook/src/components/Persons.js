import React from 'react'
import SinglePerson from './SinglePerson'


function Persons({props}) {
    const {setPersons, persons, search, setErrorMessage, setError} = props

    

    return (
        <div>
            {
          persons.filter(per => per.name.toLowerCase().indexOf(search.toLowerCase()) !== -1).map((per, i) => < SinglePerson key={i} props={{per, persons, setPersons, setErrorMessage, setError}}/>)
      }
        </div>
    )
}

export default Persons
