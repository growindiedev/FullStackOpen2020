import React, {useState, useEffect} from 'react'
import axios from 'axios';
import DisplayCountries from './components/DisplayCountries'



function App() {
    const [newSearch, setNewSearch] = useState('')
    const [countries, setCountries] = useState([])

    const handleChange = (event) => {
        setNewSearch(event.target.value)
    }

    useEffect(() => {
        console.log('Effect')
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(
            
            response => {
                console.log('promise fulfilled')
                setCountries(response.data)
                
            }
        )
    }, [])

    const results = countries.filter(country => country.name.toLowerCase().indexOf(newSearch.toLowerCase()) !== -1)
    
     

    return (
        <div>
            find countries
           <input onChange={handleChange}/>
            <DisplayCountries results={results}/>
        </div>
    )
}

export default App
