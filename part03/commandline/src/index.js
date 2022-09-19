const mongoose = require("mongoose");

if (process.argv.length === 2) {
  console.log("Please provide a password and other arguments");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@fullstackopen.jz62h2f.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  saveToDb(
    new Person({
      name: process.argv[3],
      number: process.argv[4],
    })
  );
  mongoose.connection.close();
  return;
}
if (process.argv.length === 3) {
  readFromDb();
  mongoose.connection.close();
  return;
}

function saveToDb(person) {
  person.save().then((person) => {
    console.log(
      `Added ${person.name}, number ${person.number} to the phonebook`
    );
  });
}

function readFromDb() {
  Person.find({}).then((persons) => {
    console.log("Phonebook: ");
    persons.forEach((p) => console.log(`${p.name} ${p.number}`));
  });
}
