import React from 'react'

const PersonForm = ({addNote, newName, newNumber, handleNoteChange, handleNumber}) => {
    return (
        <form onSubmit={addNote}>
        <div>
          name:
          <input
          value={newName} 
          onChange={(handleNoteChange)}
          /></div>
        <div>
          number:
          <input
          value={newNumber}
          onChange={(handleNumber)}
          /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}



export default PersonForm