const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://fullstackhy:${password}@cluster0.ccljo.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url);

const phoneSchema = new mongoose.Schema({
  firstname: String,
  phone: String,
});

const Person = mongoose.model("Person", phoneSchema);

if (process.argv.length > 3) {
  const person = new Person({
    firstname: process.argv[3],
    phone: process.argv[4],
  });

  person.save().then(() => {
    console.log("new person added");
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((res) => {
    res.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}
