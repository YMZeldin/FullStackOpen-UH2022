import {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  
  // useStste ==================================================================
  const [countries, setCountries] = useState([]) 
  const [newFilter, setNewFilter] = useState('')

  // useEffect =================================================================
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        //console.log('promise fulfilled, response.data', response.data)
        setCountries(response.data)
      })
  }, [])
  
  // handle function for filter change =========================================
  const handleFilterChange = (event) => {
    // console.log('handleFiletrChange newFilter =', event.target.value)
    setNewFilter(event.target.value)
  }

  // filtration of countries array (countries => filteredCountries) ==================
  // use external newFilter, countries
  const filteredCountries = () => {
    let filteredArr = []
    if (newFilter === '') {
      filteredArr = countries.map((country) => country)
    } else {
      filteredArr = countries.filter( country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
    }
    //console.log('filteredCountries filteredArr =', filteredArr)
    return filteredArr
  }

   // handle function for show button ==========================================
   const handleShowBtnClick = (event) => {
    // console.log('handleShowBtnClick event.target.value =', event.target.value)
    setNewFilter(event.target.value)
  }
    // App return ==============================================================
  return (
    /* <div>
      <h2>Countries</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} handleNameChange={handleNameChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons()} />
    </div> */
    <div>
      <h2>Countries</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries countries={filteredCountries()} handleShowBtnClick={handleShowBtnClick} />
    </div>
  )
}

export default App