import React from 'react'

function Persons({props}) {
    const {persons, search} = props
    return (
        <div>
            {
          persons.filter(per => per.name.toLowerCase().indexOf(search.toLowerCase()) !== -1).map((per, i) => <p key={i}>{per.name}{per.number}</p>)
      }
        </div>
    )
}

export default Persons
