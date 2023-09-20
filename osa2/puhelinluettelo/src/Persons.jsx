import React from 'react'
import Person from './Oneperson'

const Persons = ({persons, newFilter, handleDelete}) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    return (
        personsToShow.map(person =>
        <Person key={person.name} name= {person.name} number = {person.number} id = {person.name} handleDelete={handleDelete}/> ))   
}

export default Persons