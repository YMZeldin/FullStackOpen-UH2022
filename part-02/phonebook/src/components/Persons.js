import React from 'react'

// show persons list ===========================================================
// persons is the array of {name, number}
const Persons = ({ persons }) => {
  return(
  <ul>
    {persons.map( person => 
      <li key={person.name}>{person.name} {person.number}</li>)}
  </ul>
  )
}

export default Persons