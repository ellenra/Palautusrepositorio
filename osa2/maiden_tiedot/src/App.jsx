import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ShowCountry = ({ country }) => {
  const languages = Object.entries(country.languages).map(x => {
    if (x.length === 2) {
      return { langShort: x[0], lang: x[1] }
    }
  })
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital} </p>
      <p>area {country.area} </p>
      <div>
      <h3>languages:</h3>
      <ul>
        {languages.map(x => {
        return <li key={x.langShort}>{x.lang}</li>
        })}
      </ul>
      </div>
      <img src={country.flags.png} />
    </div>
  )
}

const ShowCountries = ({ countries, filter, setFilter }) => {
  console.log('Countries: ', countries.length)

  const filterCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (countries.length === 0 || filter === '') {return}

  if (filterCountries.length === 0) {
    return <p>No matches</p>
  }

  if (filterCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (filterCountries.length === 1) {
    console.log('countries: ', filterCountries.length)
    return <ShowCountry country={filterCountries[0]} />
  }
 
  return (
    <div>
      {filterCountries.map(country => {
        return (
          <div key={country.name.common}>{country.name.common} <button onClick={() => {
            setFilter(country.name.common)
          }}>show</button></div>
        )
      })}
    </div>
  )
}



const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
      <ShowCountries countries={countries} filter={filter} setFilter={setFilter} />
    </div>
  )
}

export default App
