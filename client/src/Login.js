import React, { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { store } from "./App";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [token, setToken] = useContext(store);
  const [data, setData] = useState({
    username: "",
    email: "",
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/login", data).then((res) => {
      setToken(res.data.token);
      if (res.data.token) {
        navigate("/myprofile");
      }
    });
  };

  if (token) {
    return <Navigate to="/myprofile" />;
  }

  return (
    <div>
      <center>
        <form className="login-form" onSubmit={submitHandler}>
          <h3>Login</h3>
          <input
            type="email"
            onChange={changeHandler}
            name="email"
            placeholder="Email"
          />
          <br />
          <input
            type="password"
            onChange={changeHandler}
            name="password"
            placeholder="Password"
          />
          <br />
          <input type="submit" value="Login" /> <br />
        </form>
      </center>
    </div>
  );
};

export default Login;
