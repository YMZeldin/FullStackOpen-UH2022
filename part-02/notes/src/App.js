import {useState} from 'react'
import Note from './components/Note'

const App = ({ initialNotes }) => {
  const [notes, setNotes] = useState(initialNotes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5      
    }
    
    console.log('button clicked', event.target)
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
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
    </div>
  )
}

export default App;