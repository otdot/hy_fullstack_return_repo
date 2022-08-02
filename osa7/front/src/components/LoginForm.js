import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { initializeLoggedUser } from "../reducers/loginReducer";
import { Button } from "./styled/elements";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(initializeLoggedUser(loginData));
    setLoginData({ username: "", password: "" });
  };

  return (
    <form>
      <div>
        username:{" "}
        <input
          id="username"
          type="text"
          value={loginData.username}
          name="Username"
          onChange={(e) =>
            setLoginData({ ...loginData, username: e.target.value })
          }
        />
      </div>
      <div>
        password:{" "}
        <input
          id="password"
          type="password"
          value={loginData.password}
          name="Password"
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
      </div>
      <Button id="login-button" type="button" onClick={handleLogin}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
