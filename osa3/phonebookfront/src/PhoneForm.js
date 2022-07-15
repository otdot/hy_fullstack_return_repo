import React from "react";

const PhoneForm = ({ person, handleAdd, handlePerson, handlePhone }) => {
  return (
    <form>
      <div>
        name:{" "}
        <input
          value={person.firstname}
          onChange={(e) => handlePerson(e)}
          name="name"
          type="text"
        />
      </div>
      <div>
        phone:{" "}
        <input
          value={person.phone}
          onChange={(e) => {
            handlePhone(e);
          }}
          name="phone"
          type="text"
        />
      </div>
      <button onClick={() => handleAdd(person)} type="button">
        Add
      </button>
    </form>
  );
};

export default PhoneForm;
