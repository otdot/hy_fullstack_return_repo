import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

export const More = ({ blog, handleLike }) => {
  const handleDelete = () => {
    console.log("blog", blog.id, typeof blog.id);

    const confirm = window.confirm("Are you sure you want to delete? ");
    if (confirm) {
      blogService.remove(blog.id);
      window.location.reload();
    }
  };

  return (
    <div className="moreDiv">
      <p>
        author: {blog.author}, url: {blog.url}
      </p>
      <div>
        likes: {blog.likes}
        <button style={{ margin: "4px" }} onClick={handleLike}>
          like
        </button>
        <button style={{ margin: "4px" }} onClick={handleDelete}>
          delete
        </button>
      </div>
    </div>
  );
};

export const Blog = React.forwardRef(({ blog }) => {
  const [showData, setShowData] = useState(false);

  const handleLike = async () => {
    const addedLikeObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };

    blogService.update(blog.id, addedLikeObject);
  };

  const handleClick = () => {
    setShowData(!showData);
  };

  return (
    <div className="blog" style={{ margin: "4px 0" }}>
      title: {blog.title}{" "}
      {showData && <More handleLike={handleLike} blog={blog} />}
      <button onClick={handleClick}>more</button>
    </div>
  );
});

Blog.displayName = "Blog";

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};
