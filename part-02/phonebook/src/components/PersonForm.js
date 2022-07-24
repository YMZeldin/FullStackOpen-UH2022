import React from 'react'

// form for add a new person =================================================
// handle name input with handleNameChange function
// handle phone number input with handleNumberChange function
// use addPerson function for "add" button
const PersonForm = ({ newName, handleNameChange, 
  newNumber, handleNumberChange, addPerson }) => {
  return(
    <form>
      <div> name: <input value={newName} onChange={handleNameChange} />  </div>
      <div> number: <input value={newNumber} onChange={handleNumberChange} /> </div>
      <div>
        <button onClick={addPerson} type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm