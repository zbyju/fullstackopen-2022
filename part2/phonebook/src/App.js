import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: "040-1234567" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setPhone] = useState("")

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setPhone(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if(persons.findIndex(person => person.name === newName) !== -1) {
      return alert(newName + " is already added to the phonebook.")
    }

    setPersons(persons.concat({ name: newName, phone: newPhone }))
    setNewName("")
    setPhone("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          <br />
          phone: <input value={newPhone} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <p key={person.name}>{person.name} {person.phone}</p>
      ))} 
    </div>
  )
}

export default App
