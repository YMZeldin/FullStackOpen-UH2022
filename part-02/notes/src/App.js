import {useState, useEffect} from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import './index.css'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
    </div>
  )
}

const App = () => {
  // useState ==================================================================
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  
  // useEffect =================================================================
  useEffect(() => {
    //console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  //console.log('render', notes.length, 'notes')

  // ===========================================================================
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      // id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5      
    }
    
    noteService
      .create(noteObject)
      .then(returnedNote => {
        //console.log(response)
        setNotes(notes.concat(returnedNote))
        setNewNote('')
    })
  }

  // ===========================================================================
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

 // ===========================================================================
 const toggleImportanceOf = (id) => {
  //console.log(`importance of ${id} needs to be toggled`)
  const note = notes.find(n => n.id === id)
  const changedNote = { ...note, important: !note.important }

  noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      // alert(`the note '${note.content}' was already deleted from server`)
      setErrorMessage(
        `Errow when updating importance of "${note.content}" note`
      )
      setTimeout(() => {setErrorMessage(null)}, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  // ===========================================================================
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  // ===========================================================================
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={ () => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />)}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote} 
          onChange={handleNoteChange}
          />
        <button type='submit'>save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App;
