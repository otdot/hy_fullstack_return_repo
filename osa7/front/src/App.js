import { useEffect } from "react";
import { Form } from "./components/Form";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Toggleable from "./components/Toggleable";
import UsersTable from "./components/UsersTable";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";
import { setLoggedUser } from "./reducers/loginReducer";
import Blogs from "./components/Blogs";
import { Routes, Route } from "react-router-dom";
import SingleUser from "./components/SingleUser";
import Navigation from "./components/Navigation";
import SingleBlog from "./components/SingleBlog";
import "./app.css";
const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.login.loggedUser);
  const errorMessage = useSelector((state) => state.login.errorMessage);

  useEffect(() => {
    const loggedBlogAppUser = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedBlogAppUser) {
      const user = JSON.parse(loggedBlogAppUser);
      dispatch(setLoggedUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initializeUsers());
    dispatch(initializeBlogs());
  }, []);

  return (
    <>
      <Navigation />
      <p>{errorMessage && errorMessage}</p>
      {!loggedUser && <LoginForm />}
      <Routes>
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="/users/:id" element={<SingleUser />} />
      </Routes>
    </>
  );
};

export default App;
