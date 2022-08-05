import {useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import dbExchangeService from './services/dbExchange'

// notification = {message, style} =============================================
// notification.style='notification' or 'error'
const Notification = ({ notification }) => {
  //console.log('Notification', notification)
  const baseNotifStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  const notificationStyle = { ...baseNotifStyle, color: 'green' }
  const errorStyle = { ...baseNotifStyle, color: 'red' }
  const currentStyle = (notification.style === 'notification') ? notificationStyle : errorStyle
  
  if (notification.message === null || notification.message === '') {
    return null
  }
  return (
    <div style={currentStyle}>
      {notification.message}
    </div>
  )
}

const App = () => {
  
  // useStste ==================================================================
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNewNotification] = useState({message: '', style: 'notification'})

  // useEffect =================================================================
  useEffect(() => {
    dbExchangeService
      .getAllPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
   }, [])
  
   // ==========================================================================
  const showNotification = (message, notificationStyle ) => {
    const newNotification = {
      message: message,
      style: notificationStyle
    }
    setNewNotification(newNotification)
    setTimeout(() => {setNewNotification({message: '', style: 'notification'})}, 5000)
  }

  // Add new person to persons array ===========================================
  const addPerson = (event) => {
    event.preventDefault()
    const newPersonObject = {
      name: newName,
      number: newNumber
    }
  
    // if name exists, nameExist >= 0, otherwise nameExist === -1
    const nameExist = persons.findIndex(person => person.name === newName)
    //console.log('newName', newName, 'nameExist', nameExist)
    if (nameExist !== -1) {
      if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
        const oldPerson = persons.find(person => person.name === newName)
        const changedPerson = { ...oldPerson, number: newNumber }
        dbExchangeService
          .updatePerson(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            showNotification(`${changedPerson.name} number was updated in the phonebook`, 'notification')
          })
          .catch(error => {
            //alert(`Error when replacing ${changedPerson.name} number in the database`)
            showNotification(`Error when updating ${changedPerson.name} number in the phonebook`, 'error')
          })
      }
      return
    }
    
    dbExchangeService
      .createPerson(newPersonObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`${newPersonObject.name} was added to the phonebook`, 'notification')
      })
      .catch(error => {
        // alert(`Error when adding ${newPersonObject.name} to the database`)
        showNotification(`Error when adding ${newPersonObject.name} to the phonebook`, 'error')
      })
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

  // handle function for person delete button ==================================
  const handleDeleteButton = (event) => {
    event.preventDefault()
    // event.target.value is person id. Should use '==' to equal
    const personToDelete = persons.find(person => person.id === Number(event.target.value))
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      dbExchangeService
        .deletePerson(personToDelete.id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== personToDelete.id))
          setNewName('')
          setNewNumber('')
          showNotification(`${personToDelete.name} was deleted from the phonebook`, 'notification')
        })
        .catch(error => {
          // alert(`Error when deleting ${personToDelete.name} from the database`)
          showNotification(`Error when deleting ${personToDelete.name} from the phonebook`, 'error')
        })
    }
  }

  // App return ================================================================
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} handleNameChange={handleNameChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons()} handleDeleteButton={handleDeleteButton} />
    </div>
  )
}

export default App
