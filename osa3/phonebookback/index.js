require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/phonebook");

const app = express();

app.use(express.static("build"));
app.use(express.json());
app.use(cors());

//Logs axios posts to backend console
morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});
app.use(morgan(":body"));

app.get("/api/persons", (req, res) => {
  Person.find({}).then((person) => {
    res.json(person);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((response) => {
      if (response) {
        res.json(response);
      } else {
        res.status(400).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (body.firstname === undefined || body.phone === undefined) {
    return res.status(400).send({ error: "content missing" });
  }

  const person = new Person({
    firstname: body.firstname,
    phone: body.phone,
  });

  person
    .save()
    .then((savedperson) => {
      console.log(savedperson);
      res.json(savedperson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const person = {
    firstname: body.firstname,
    phone: body.phone,
  };

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has people </p> <br> ${new Date()}`);
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.log("error: ", error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is running on: ${PORT}`);
});

// {
//   console.log("id not matching any person", error);
//   res.status(500).json({ error: `malformatted id` });
// }
