import React from 'react'

function Filter({props}) {
    const {handleSearch} = props
    return (
        <div>
        filter shown with: <input onChange={handleSearch}/>
      </div>
    )
}

export default Filter
