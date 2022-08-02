import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userService from "../services/users";

const SingleUser = () => {
  const [user, setUser] = useState(null);
  const id = useParams().id;

  useEffect(() => {
    userService.getOne(id).then((res) => setUser(res));
  }, []);

  if (!user) {
    return <p> Loading...</p>;
  }

  return (
    <div>
      <h1>{user.username}</h1>
      {user.blogs.map((blog) => {
        return (
          <div key={blog.id}>
            {blog.title} likes: {blog.likes} url: {blog.url}
          </div>
        );
      })}
    </div>
  );
};

export default SingleUser;
