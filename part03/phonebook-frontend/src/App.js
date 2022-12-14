import { useEffect, useState } from "react";

import "./index.css";

import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Notification from "./Notification";
import PersonsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(undefined);

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

  const showNotification = (notification, time = 5000) => {
    setNotification(notification);
    setTimeout(() => setNotification(undefined), time);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson !== undefined) {
      // Person exists and the new number is the same as the one in db
      if (existingPerson.number === newNumber)
        return alert(newName + " is already added to the phonebook.");

      // Person already exists but has different number
      // Update the number in the db?
      if (
        window.confirm(
          existingPerson.name +
            " is already in the database, do you want to replace the number?"
        )
      ) {
        const newPerson = {
          id: existingPerson.id,
          name: newName,
          number: newNumber,
        };
        PersonsService.putPersons(newPerson)
          .then((data) => {
            const newPersons = persons.map((p) => {
              if (p.id !== existingPerson.id) return p;
              return data;
            });
            setPersons(newPersons);
            setNewName("");
            setNumber("");
          })
          .catch((err) => {
            if (err.response.data.error.toLowerCase().includes("validation")) {
              showNotification({
                text: err.response.data.error,
                type: "error",
              });
            } else {
              setPersons(persons.filter((p) => p.id !== existingPerson.id));
              showNotification({
                text: newName + " has already been deleted",
                type: "error",
              });
            }
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      PersonsService.postPersons(newPerson)
        .then((person) => {
          setPersons(persons.concat(person));
          showNotification({ text: "Added " + person.name, type: "success" });
          setNewName("");
          setNumber("");
        })
        .catch((err) => {
          console.log(err);
          showNotification({ text: err.response.data.error, type: "error" });
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
