import React from 'react'

// show persons list ===========================================================
// persons is the array of {name, number}
const Persons = ({ persons, handleDeleteButton }) => {
  return(
  <ul>
    {persons.map( person => 
      <li key={person.name}>
        {person.name} {person.number}
        <button onClick={handleDeleteButton} value={person.id}>delete</button>
      </li>)}
  </ul>
  )
}

export default Persons
