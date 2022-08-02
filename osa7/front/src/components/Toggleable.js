import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, StyledDiv } from "./styled/elements";

const Toggleable = React.forwardRef(({ buttonText, children }) => {
  const [toggleButtons, setToggleButtons] = useState(true);
  const showButtons = toggleButtons ? "block" : "none";
  const hideButtons = toggleButtons ? "none" : "block";

  const handleClick = () => {
    setToggleButtons(!toggleButtons);
  };

  return (
    <StyledDiv>
      <div style={{ display: showButtons }}>
        <Button onClick={handleClick}>{buttonText}</Button>
      </div>
      <div style={{ display: hideButtons }}>
        {children}
        <Button onClick={handleClick}>Hide form</Button>
      </div>
    </StyledDiv>
  );
});

Toggleable.displayName = "Toggleable";

Toggleable.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

export default Toggleable;
