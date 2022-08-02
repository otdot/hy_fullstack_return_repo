import React from "react";
import { useSelector } from "react-redux";
import { StyledDiv, StyledLink } from "./styled/elements";

const User = ({ user }) => {
  return (
    <tr>
      <td>
        <StyledLink to={`/users/${user.id}`}>{user.username}</StyledLink>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  );
};

const UsersTable = () => {
  const users = useSelector((state) => state.users);

  return (
    <StyledDiv>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </StyledDiv>
  );
};

export default UsersTable;
