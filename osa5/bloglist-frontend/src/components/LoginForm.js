import React from "react";

const LoginForm = ({
  handleLogin,
  handleUsername,
  handlePassword,
  loginData,
}) => {
  return (
    <form>
      <div>
        username:{" "}
        <input
          id="username"
          type="text"
          value={loginData.username}
          name="Username"
          onChange={(e) => handleUsername(e)}
        />
      </div>
      <div>
        password:{" "}
        <input
          id="password"
          type="password"
          value={loginData.password}
          name="Password"
          onChange={(e) => handlePassword(e)}
        />
      </div>
      <button id="login-button" type="button" onClick={handleLogin}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
