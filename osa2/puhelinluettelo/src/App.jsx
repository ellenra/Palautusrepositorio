import { useState, useEffect } from 'react'
import React from 'react'
import PersonForm from './components/personform'
import Persons from './components/Persons'
import personService from './services/personservices'
import FilterForm from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-123456' , id : 1}]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    if(newName.length === 0) {
      return
    }
    const noteObject = {
      name: newName,
      number: newNumber
    }

    if(persons.some(p => p.name === newName)) {
      const updateNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(!updateNumber) {
        return
      } else {
        const personArray = [...persons]
        const index = personArray.findIndex(p => p.name === newName)
        if(index !== -1) {
          console.log('new id is', index)
          personService
          .update(personArray[index].id, noteObject)
          .then(newcontact => {
            personArray[index] = newcontact
            setPersons(personArray)
            setNewName('')
            setNewNumber('')
            setNewFilter('')
          })
        }
      }
    } else {
      personService
      .create(noteObject)
      .then(newperson => {
        setPersons(persons.concat(newperson))
        setNewName('')
        setNewNumber('')
      })
    }}

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDelete = (name) => {
    const ready = window.confirm(`Delete ${name}`)
    if(!ready) {
      return
    }

    const result = persons.filter(p => p.name === name)
    console.log(result)

    if(result.length === 1) {
      const noteObject = result[0]
      personService
      .remove(noteObject.id)
      .then(newperson => {
        setPersons(persons.filter(p => p.id !== noteObject.id))
      })
    }
  }

  const handleFilterSubmit = (event) => event.preventDefault()

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <FilterForm handleFilterSubmit={handleFilterSubmit} newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new contact</h2>
      <PersonForm
      addNote={addNote} newName={newName} handleNoteChange={handleNoteChange} 
      newNumber={newNumber} handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <Persons
      persons={persons} newFilter={newFilter} handleDelete={handleDelete}
      />
    </div>
  )

}


export default App