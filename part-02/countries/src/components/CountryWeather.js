import {React, useState, useEffect} from 'react'
import axios from 'axios'

// show country weather
// country is the JSON object, 
// filterd response from https://restcountries.com/v3.1/all
const CountryWeather = ({ country }) => {
  // console.log('CountryWeather country = ', country)
  
  // initialization is needed for the first rendering
  const [weatherObj, setNewWeatherObj] = useState({
    "main": {"temp": 273},
    "weather": [{"icon": '04d'}],
    "wind": {"speed": 0}
  })
 
  // one country
  
  // http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=xxx
  const weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + country.capital +
  '&APPID=' + process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(weatherURL)
      .then(response => {
      //console.log('CountryWeather, response.data', response.data)
      setNewWeatherObj(response.data)
    })
  }, [])
  
  return(
    <div>
      <h2>Weather in {country.capital}</h2>
      <div>temperature {Math.round((weatherObj.main.temp - 273)*100)/100} Celsius</div>
      <img src={'http://openweathermap.org/img/wn/' + weatherObj.weather[0].icon + '@2x.png'} alt="weatherIcon" />
      <div>wind {weatherObj.wind.speed} m/s</div>
    </div>
  )
}

export default CountryWeather
