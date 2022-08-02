import React, { useEffect, useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";
import {
  update_blog,
  delete_blog,
  add_like_to_blog,
} from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";
import { Button, CommentP, StyledA, StyledDiv } from "./styled/elements";

const More = ({ blog }) => {
  const dispatch = useDispatch();

  const handleLike = async () => {
    const addedLikeObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };

    dispatch(add_like_to_blog(blog.id, addedLikeObject));
  };

  const handleDelete = () => {
    const confirm = window.confirm("Are you sure you want to delete? ");
    if (confirm) {
      blogService.remove(blog.id);
      window.location.reload();
    }
  };

  return (
    <div className="moreDiv">
      <p>
        author: {blog.author} <StyledA href="#">url: {blog.url}</StyledA>
      </p>
      <div>
        likes: {blog.likes}
        <Button style={{ margin: "4px" }} onClick={handleLike}>
          like
        </Button>
        <Button style={{ margin: "4px" }} onClick={handleDelete}>
          delete
        </Button>
      </div>
    </div>
  );
};

const SingleBlog = () => {
  const [blog, setBlog] = useState(null);
  const [showData, setShowData] = useState(false);
  const id = useParams().id;

  useEffect(() => {
    blogService.getOne(id).then((res) => setBlog(res));
  }, []);

  if (!blog) {
    return <p>Loading...</p>;
  }
  console.log("blog", blog);

  return (
    <StyledDiv>
      <div>
        <h1>{blog.title}</h1>
        {showData && <More blog={blog} />}
        <Button onClick={() => setShowData(!showData)}>More</Button>
      </div>
      <div>
        <CommentForm />
      </div>
      <div>
        <h2>Comments</h2>
        {blog.comments.map((comment, i) => (
          <CommentP key={i}>
            {comment.comment} by: {comment.user}
          </CommentP>
        ))}
      </div>
    </StyledDiv>
  );
};

export default SingleBlog;
