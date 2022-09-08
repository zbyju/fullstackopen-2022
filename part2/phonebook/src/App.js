import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState("")
  const [filter, setFilter] = useState("")

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
      filter shown with: <input value={filter} onChange={handleFilterChange} />
      <h3>Add new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          <br />
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filtered.map(person => (
        <p key={person.name}>{person.name} {person.number}</p>
      ))} 
    </div>
  )
}

export default App
