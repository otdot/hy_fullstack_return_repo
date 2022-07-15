import React from "react";

const Person = ({ name, phone }) => {
  return (
    <div>
      <p>
        {name} {phone}
      </p>
    </div>
  );
};

export default Person;
