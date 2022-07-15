import React, { useState, useEffect } from "react";
import axios from "axios";
import Person from "./Person";

const Phonebook = ({ data }) => {
  return (
    <div style={{ minHeight: "84vh" }}>
      {data.map((person, i) => (
        <Person key={i} name={person.firstname} phone={person.phone} />
      ))}
    </div>
  );
};

export default Phonebook;
