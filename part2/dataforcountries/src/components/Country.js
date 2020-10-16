import React, {useState} from 'react'
import View from './View'


function Country({props}) {
    const {results, country} = props
    const [viewIsOn, setViewIsOn] = useState(false)

    const countryArray = results.filter(county => county.name === country.name)
    return (
        <div>{country.name}<button onClick={() => setViewIsOn(!viewIsOn)}>show</button> 
        {viewIsOn &&  <View props={{results: countryArray} }/>}
        </div>
    )
}

export default Country
