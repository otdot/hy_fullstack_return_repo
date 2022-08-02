import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useField } from "../hooks";
import { add_comment_to_blog } from "../reducers/blogReducer";
import { setErrorMessage } from "../reducers/loginReducer";
import { Button, StyledDiv } from "./styled/elements";

const CommentForm = () => {
  const dispatch = useDispatch();
  const comment = useField("text");
  const id = useParams().id;
  const loggedUser = useSelector((state) => state.login.loggedUser);

  const addComment = (e) => {
    e.preventDefault();
    if (comment.value === "") {
      dispatch(setErrorMessage("comment needs a value"));
      setTimeout(() => {
        dispatch(setErrorMessage(""));
      }, 3000);
      return;
    }
    dispatch(
      add_comment_to_blog(id, {
        comment: comment.value,
        user: loggedUser.username,
      })
    );
  };

  console.log(comment.value);

  return (
    <StyledDiv>
      <form>
        <input {...comment} />
        <Button onClick={addComment}>comment</Button>
      </form>
    </StyledDiv>
  );
};

export default CommentForm;
