import React from "react";

const Notification = ({ name }) => {
  return (
    <div
      style={{ color: "green", border: "solid green 2px", minWidth: "50vw" }}
    >
      <p>a new blog has been added. by {name}</p>
    </div>
  );
};

export default Notification;
