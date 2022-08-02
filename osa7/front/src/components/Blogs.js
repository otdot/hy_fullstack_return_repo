import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form } from "./Form";
import { StyledDiv, StyledLink } from "./styled/elements";
import Toggleable from "./Toggleable";

export const Blog = React.forwardRef(({ blog }) => {
  return (
    <div className="blog" style={{ margin: "4px 0" }}>
      <StyledLink to={`/blogs/${blog.id}`}>title: {blog.title}</StyledLink>
    </div>
  );
});

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const loggedUser = useSelector((state) => state.login.loggedUser);

  return (
    <StyledDiv>
      {loggedUser && (
        <Toggleable buttonText="add blog">
          <p>Hello {loggedUser.username}</p>
          <Form user={loggedUser} />
        </Toggleable>
      )}
      <h2>blogs</h2>
      {blogs
        .map((blog) => <Blog key={blog.id} blog={blog} />)
        .sort((a, b) => b.props.blog.likes - a.props.blog.likes)}
    </StyledDiv>
  );
};

export default Blogs;
