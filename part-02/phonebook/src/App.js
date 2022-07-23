import {useState} from 'react'
// import Note from './components/Note'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
    const addPerson = (event) => {
    event.preventDefault()
    const tmpObject = {
      name: newName,
      number: newNumber
    }
  
    // if name exists, nameExist >= 0, otherwise nameExist === -1
    const nameExist = persons.findIndex(person => person.name === newName)
    
    console.log('button clicked', event.target)
    console.log('newName', newName, 'nameExist', nameExist)
    
    if (nameExist !== -1) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    
    setPersons(persons.concat(tmpObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    // console.log('handleNameChange newName =', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log('handleNumberChange newNumber =', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log('handleFiletrChange newFilter =', event.target.value)
    setNewFilter(event.target.value)
  }

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

    return (
    <div>
      <h2>Phonebook</h2>
        <div> filter shown with: <input value={newFilter} onChange={handleFilterChange} /> </div>
      <h3>add a new</h3>
      <form>
        <div> name: <input value={newName} onChange={handleNameChange} />  </div>
        <div> number: <input value={newNumber} onChange={handleNumberChange} /> </div>
        <div>
          <button onClick={addPerson} type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
        <ul>
          {filteredPersons().map( person => <li key={person.name}>{person.name} {person.number}</li>)}
        </ul>
    </div>
  )
}

export default App;
