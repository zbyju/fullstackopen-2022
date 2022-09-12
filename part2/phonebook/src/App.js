import { useEffect, useState } from 'react'
import axios from "axios"

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(persons => {
      setPersons(persons.data)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filterPersons = (filter) => {
    return persons.filter(person => person.name.toLowerCase().includes(filter))
  }

  const filtered = filter === "" ? persons : filterPersons(filter)

  const handleSubmit = (event) => {
    event.preventDefault()

    if(persons.findIndex(person => person.name === newName) !== -1) {
      return alert(newName + " is already added to the phonebook.")
    }

    setPersons(persons.concat({ id: persons.length, name: newName, number: newNumber}))
    setNewName("")
    setNumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add new</h3>
      <PersonForm name={newName} number={newNumber} onSubmit={handleSubmit} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />  
      <h2>Numbers</h2>
      <Persons persons={filtered} />     
    </div>
  )
}

export default App
