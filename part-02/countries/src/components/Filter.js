import React from 'react'

// input field for newFilter =================================================
// handle input with handleFilterChange function
const Filter = ({ newFilter, handleFilterChange }) => {
  return(
    <div>
      find countries <input value={newFilter} onChange={handleFilterChange} /> 
    </div>
  )
}

export default Filter