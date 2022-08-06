import React from 'react'
import CountryWeather from './CountryWeather'

// show countries list =========================================================
// countries is the array of JSON objects, 
// response from https://restcountries.com/v3.1/all
const Countries = ({ countries, handleShowBtnClick }) => {
  
  //console.log('Countries countries.length =', countries.length)
  const langArray = []
   
  // convert JSON object countries[0].languages to array of languages string
  if (countries.length === 1) {
    for (const [key, value] of Object.entries(countries[0].languages)) {
      langArray.push(`${value}`)
    }
    //console.log('Countries.langArray', langArray)
  }
  
  // more then 10 countries
  if (countries.length > 10) { 
    //console.log('Countries countries.length > 10')
    return(
    <div>Too many matches, specify another filter</div>)
  }
  // less then 10 countries but more than one
  if (countries.length !== 1) {
    //console.log('Countries countries.length > 1 but < 10')
    return(
      countries.map( country => {
       return(
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={handleShowBtnClick} type="submit" value={country.name.common}>show</button>
        </div>
        )
      })
    )
  }
  
  // one country
  //console.log('Countries countries.length === 1')
  return(
    <div>
      <h1>{countries[0].name.common}</h1>
      <div>capital {countries[0].capital}</div>
      <div>area {countries[0].area}</div>
      <h2>languages:</h2>
      <ul>
        {langArray.map( language => <li key={language}>{language}</li>)}
      </ul>
      <img src={countries[0].flags.png} alt="flag" />
      <CountryWeather country={countries[0]} />
    </div>
  )
}

export default Countries
