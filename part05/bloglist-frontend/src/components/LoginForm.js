import { useState } from "react";
import loginService from "../services/login";

const LoginForm = ({ onLogin, onError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      onLogin(user);
    } catch (err) {
      onError(err);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} className="login-form">
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            className="login-form-username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            className="login-form-password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
