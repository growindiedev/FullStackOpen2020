import React from 'react'
import View from './View'
import Country from './Country'

function DisplayCountries({results})  {
   
    
    
    if (results.length < 10 && results.length > 1) {
        return results.map((country, i) => <Country key={i} props={{results,country, i}}/>)
    } else if( results.length === 1) {
        return (<View props={{results}}/>)
    }

    return (<div>Too many matches, specify another filter</div>)
    
}

export default DisplayCountries
