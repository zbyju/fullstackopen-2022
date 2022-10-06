import { useState } from "react";
import loginService from "../services/login";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUsername("");
      setPassword("");
      console.log(user);
      onLogin(user);
    } catch (err) {
      console.log("error when logging in", err);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        {" "}
        <div>
          {" "}
          username{" "}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />{" "}
        </div>{" "}
        <div>
          {" "}
          password{" "}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />{" "}
        </div>{" "}
        <button type="submit">login</button>{" "}
      </form>
    </>
  );
};

export default LoginForm;
