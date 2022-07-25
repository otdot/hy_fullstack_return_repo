import React, { useState } from "react";
// import blogService from "../services/blogs";
import Alert from "./Alert";
import Notification from "./Notification";

export const Form = ({ user, addBlog }) => {
  const [blogData, setBlogData] = useState({ title: "", url: "" });
  const [showNotification, setShowNotification] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      {showNotification && <Notification name={user.name} />}
      {showAlert && <Alert />}
      <form>
        <div>
          title:
          <input
            id="title"
            value={blogData.title}
            type="text"
            name="Title"
            placeholder="title"
            onChange={(e) =>
              setBlogData({ ...blogData, title: e.target.value })
            }
          />
        </div>
        <div>
          url:
          <input
            id="url"
            value={blogData.url}
            type="text"
            name="Url"
            placeholder="url"
            onChange={(e) => setBlogData({ ...blogData, url: e.target.value })}
          />
        </div>
        <div>
          <button
            id="add-button"
            onClick={() => addBlog(blogData, setShowNotification, setShowAlert)}
            type="button"
          >
            add blog
          </button>
        </div>
      </form>
    </>
  );
};
