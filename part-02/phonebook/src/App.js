import {useState} from 'react'
// import Note from './components/Note'

const App = ({ initialNotes }) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  
  /* const [notes, setNotes] = useState(initialNotes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true) */
  
  const addName = (event) => {
    event.preventDefault()
    const tmpObject = {
      name: newName
    }
  
    // if name exists, nameExist >= 0, otherwise nameExist === -1
    const nameExist = persons.findIndex(person => person.name === newName)
    
    console.log('button clicked', event.target)
    console.log('newName', newName, 'nameExist', nameExist)
    
    if (nameExist >= 0) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    
    setPersons(persons.concat(tmpObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  /*const notesToShow = showAll ? notes : notes.filter(note => note.important) */

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button onClick={addName} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map( person => <li key={person.name}>{person.name}</li>)}
        </ul>
    </div>
    /* <div>
      <h1>Notes</h1>
      <div>
        <button onClick={ () => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note} />)}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote} 
          onChange={handleNoteChange}
          />
        <button type='submit'>save</button>
      </form>
    </div> */
  )
}

export default App;
