const Persons = ({ persons, onDelete }) => {
  console.log(persons);
  return (
    <>
      {persons.map((person) => (
        <div key={person.id}>
          <span>
            {person.name} {person.number}
          </span>
          <button onClick={() => onDelete(person)}>Delete</button>
          <br />
        </div>
      ))}
    </>
  );
};

export default Persons;
