import React from "react";
import { Link } from "react-router-dom";
import { Header, StyledLink } from "./styled/elements";

const Navigation = () => {
  return (
    <Header>
      <h1>Blog app</h1>
      <nav>
        <StyledLink to="/blogs">Blogs</StyledLink>
        <StyledLink to="/users">Users</StyledLink>
      </nav>
    </Header>
  );
};

export default Navigation;
