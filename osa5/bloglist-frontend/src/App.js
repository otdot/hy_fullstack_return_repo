import { useState, useEffect } from "react";
import { Blog } from "./components/Blog";
import { Form } from "./components/Form";
import blogService from "./services/blogs";
import { login } from "./services/login";
import LoginForm from "./components/LoginForm";
import Toggleable from "./components/Toggleable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedBlogAppUser = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedBlogAppUser) {
      const user = JSON.parse(loggedBlogAppUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(loginData);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setLoginData({ username: "", password: "" });
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    blogService.setToken("");
  };

  const addBlog = (blogData, setShowNotification, setShowAlert) => {
    blogService.handleBlog(
      blogData,
      user.name,
      setShowNotification,
      setShowAlert
    );

    window.location.reload();
  };

  const formFuncs = {
    loginForm: {
      handleUsername: (e) =>
        setLoginData({ ...loginData, username: e.target.value }),
      handlePassword: (e) =>
        setLoginData({ ...loginData, password: e.target.value }),
      handleLogin: handleLogin,
      loginData: loginData,
    },
  };

  return (
    <div>
      <p>{errorMessage && errorMessage}</p>
      {!user ? (
        <LoginForm {...formFuncs.loginForm} />
      ) : (
        <Toggleable buttonText="add blog">
          <p>Hello {user.name}</p>
          <Form addBlog={addBlog} user={user} />
          <button onClick={handleLogout}>Log out</button>
        </Toggleable>
      )}

      <h2>blogs</h2>
      {blogs
        .map((blog) => <Blog key={blog.id} blog={blog} />)
        .sort((a, b) => b.props.blog.likes - a.props.blog.likes)}
    </div>
  );
};

export default App;
