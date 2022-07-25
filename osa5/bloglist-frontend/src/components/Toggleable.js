import React, { useState } from "react";
import PropTypes from "prop-types";

const Toggleable = React.forwardRef(({ buttonText, children }) => {
  const [toggleButtons, setToggleButtons] = useState(true);
  const showButtons = toggleButtons ? "block" : "none";
  const hideButtons = toggleButtons ? "none" : "block";

  const handleClick = () => {
    setToggleButtons(!toggleButtons);
  };

  return (
    <div>
      <div style={{ display: showButtons }}>
        <button onClick={handleClick}>{buttonText}</button>
      </div>
      <div style={{ display: hideButtons }}>
        {children}
        <button onClick={handleClick}>Hide form</button>
      </div>
    </div>
  );
});

Toggleable.displayName = "Toggleable";

Toggleable.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

export default Toggleable;
