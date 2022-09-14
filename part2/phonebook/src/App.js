import { useEffect, useState } from "react";
import axios from "axios";

import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import PersonsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    PersonsService.getPersons().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDeleteClick = (person) => {
    if (window.confirm("Do you really want to delete " + person.name))
      PersonsService.deletePersons(person.id).then((_) => {
        const newPersons = persons.filter((p) => p.id !== person.id);
        setPersons(newPersons);
      });
  };

  const filterPersons = (filter) => {
    return persons.filter((person) =>
      person.name.toLowerCase().includes(filter)
    );
  };

  const filtered = filter === "" ? persons : filterPersons(filter);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.findIndex((person) => person.name === newName) !== -1) {
      return alert(newName + " is already added to the phonebook.");
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    PersonsService.postPersons(newPerson).then((person) => {
      setPersons(persons.concat(person));
      setNewName("");
      setNumber("");
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        onSubmit={handleSubmit}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filtered} onDelete={handleDeleteClick} />
    </div>
  );
};

export default App;
