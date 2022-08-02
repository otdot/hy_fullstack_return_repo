import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/loginReducer";
import { post_blog } from "../reducers/blogReducer";
import Alert from "./Alert";

import Notification from "./Notification";
import { Button, StyledDiv } from "./styled/elements";
import { useField } from "../hooks";

export const Form = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.login.loggedUser);
  const title = useField("text");
  const url = useField("text");
  const [showNotification, setShowNotification] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const addBlog = (blogData, setShowNotification, setShowAlert) => {
    dispatch(
      post_blog(
        blogData,
        loggedUser.username,
        setShowNotification,
        setShowAlert
      )
    );
  };

  return (
    <StyledDiv>
      {showNotification && <Notification name={loggedUser.username} />}
      {showAlert && <Alert />}
      <form>
        <div>
          title:
          <input id="title" name="Title" placeholder="title" {...title} />
        </div>
        <div>
          url:
          <input id="url" name="Url" placeholder="url" {...url} />
        </div>
        <div>
          <Button
            id="add-button"
            onClick={() =>
              addBlog(
                { title: title.value, url: url.value },
                setShowNotification,
                setShowAlert
              )
            }
            type="button"
          >
            add blog
          </Button>
        </div>
      </form>
      <Button onClick={handleLogout}>Log out</Button>
    </StyledDiv>
  );
};
