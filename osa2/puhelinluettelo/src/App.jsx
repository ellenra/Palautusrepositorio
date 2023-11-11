import { useState, useEffect } from 'react'
import React from 'react'
import PersonForm from './components/personform'
import Persons from './components/Persons'
import personService from './services/personservices'
import FilterForm from './components/Filter'
import './index.css'

const GoodNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="good">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-123456' , id : 1}]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [goodMessage, setGoodMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])

  const addNote = (event) => {
    event.preventDefault()

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
            setGoodMessage(`${newcontact.name}'s number changed!`)
            setTimeout(() => {
            setGoodMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of '${noteObject.name}' has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
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
        setNewFilter('')
        setGoodMessage(`Added ${newperson.name}!`)
        setTimeout(() => {
          setGoodMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`Ǹame is shorter than the minimum allowed length (3) or number is not in correct form`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
}

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
        setGoodMessage(`Number deleted!`)
        setTimeout(() => {
          setGoodMessage(null)
        }, 5000)
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
      <GoodNotification message={goodMessage} />
      <ErrorNotification message={errorMessage} />
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