import {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  
  // useStste ==================================================================
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  // useEffect =================================================================
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        // console.log('promise fulfilled, persons.data', response.data)
        setPersons(response.data)
      })
  }, [])
  
  // Add new person to persons array ===========================================
  const addPerson = (event) => {
    event.preventDefault()
    const tmpObject = {
      name: newName,
      number: newNumber
    }
  
    // if name exists, nameExist >= 0, otherwise nameExist === -1
    const nameExist = persons.findIndex(person => person.name === newName)
    
    // console.log('button clicked', event.target)
    // console.log('newName', newName, 'nameExist', nameExist)
    
    if (nameExist !== -1) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    
    setPersons(persons.concat(tmpObject))
    setNewName('')
    setNewNumber('')
  }

  // handle function for name change ===========================================
  const handleNameChange = (event) => {
    // console.log('handleNameChange newName =', event.target.value)
    setNewName(event.target.value)
  }

  // handle function for phone number change ===================================
  const handleNumberChange = (event) => {
    // console.log('handleNumberChange newNumber =', event.target.value)
    setNewNumber(event.target.value)
  }

  // handle function for filter change =========================================
  const handleFilterChange = (event) => {
    // console.log('handleFiletrChange newFilter =', event.target.value)
    setNewFilter(event.target.value)
  }

  // filtration of persons array (persons => filteredPersons) ==================
  // use external newFilter, persons
  const filteredPersons = () => {
    let filteredArr = []
    if (newFilter === '') {
      filteredArr = persons.map((person) => person)
    } else {
      filteredArr = persons.filter( person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    }
    // console.log('filteredPersons filteredArr =', filteredArr)
    return filteredArr
  }

    // App return ================================================================
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} handleNameChange={handleNameChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons()} />
    </div>
  )
}

export default App