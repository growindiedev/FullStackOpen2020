import React, {useEffect, useState} from 'react'
import axios from 'axios'

function View({props}) {
    //const [Weather, setWeather] = useState()
    const {results} = props;
    const api_key = process.env.REACT_APP_API_KEY
    const [data, setData] = useState(null)
    

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${results[0].capital}`)
        .then(response => {
            
            setData(response.data)
        })
        
    }, [])

    const dataDisplay = () => {
        if (!data) {
            return <p>{'loading...'}</p>
        } else {
            const {location: {name}, current: {temperature}, current: {wind_speed}, current: {weather_icons}, current: {wind_dir}} = data;
            return (
              <div>
                  <div>{`temprature: ${temperature} Celcius`}</div>
                  <div><img src={weather_icons[0]} width="100px"/></div>
                  <div>{`wind: ${wind_speed} direction ${wind_dir}`}</div>
              </div>  
            )
        
        }
    }
    

    return (
        <div>
        
            <h2>{results[0].name}</h2>
            <div>{`capital ${results[0].capital}`}</div>
            <div> {`population ${results[0].population}`} </div>
            <h3>Languages</h3>
            <ul>
             {results[0].languages.map((lang, i) => <li key={i}>{lang.name}</li>)}
            </ul>
            <img src={results[0].flag} width="100px"/>
            <h3>{`Weather in ${results[0].capital}`}</h3>
            {dataDisplay()}
            
        </div>
    )
}

export default View
