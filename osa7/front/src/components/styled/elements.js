import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledDiv = styled.div`
  margin: 2rem 1rem;
`;

export const Header = styled.header`
  height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: aqua;
`;

export const Button = styled.button`
  border: 0;
  background-color: orange;
  border-radius: 2px;
  padding: 5px;
  margin: 2px;

  &:hover {
    background-color: yellow;
  }
`;

export const StyledLink = styled(Link)`
  margin: 1rem;
  color: black;
  text-decoration: none;

  &:hover {
    color: grey;
  }
`;

export const CommentP = styled.p`
  border: 1px solid black;
  margin: 5px;
`;

export const StyledA = styled.a`
  text-decoration: underline;
  color: black;

  &:hover {
    color: grey;
  }
`;
