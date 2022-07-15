import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Phonebook from "./Phonebook";
import PhoneForm from "./PhoneForm";

function App() {
  const [data, setData] = useState([]);
  const [person, setPerson] = useState({
    firstname: "",
    phone: "",
  });

  const baseUrl = "/api/persons";

  useEffect(() => {
    axios.get(baseUrl).then((res) => setData(res.data));
  }, []);

  const handleAdd = (person) => {
    if (!person.firstname || !person.phone) {
      return;
    }

    const personInArray = data.find(
      (singlePerson) =>
        singlePerson.firstname.toLowerCase() === person.firstname.toLowerCase()
    );

    if (personInArray) {
      console.log("personInArray", personInArray);
      axios
        .put(`${baseUrl}/${personInArray.id}`, person)
        .then(() => console.log("person updated: ", person))
        .catch((error) => console.log("error", error.response.data));
    } else {
      axios
        .post(baseUrl, person)
        .then(() => console.log(person, "added to phonebook"))
        .catch((error) => console.log("error", error.response.data));
    }

    setPerson({ firstname: "", phone: "" });
  };

  return (
    <h1>
      <Header />
      <PhoneForm
        baseUrl={baseUrl}
        handleAdd={handleAdd}
        handlePerson={(e) =>
          setPerson({ ...person, firstname: e.target.value })
        }
        handlePhone={(e) => setPerson({ ...person, phone: e.target.value })}
        person={person}
      />
      <Phonebook baseUrl={baseUrl} data={data} />
      <Footer />
    </h1>
  );
}

export default App;
