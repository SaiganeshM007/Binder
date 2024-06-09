import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmedpassword: "",
    age: "",
    gender: "",
    location: "",
    contact: "",
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/register", data)
      .then((res) => alert(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <center>
        <form className="register-form" onSubmit={submitHandler}>
          <h3>Register</h3>
          <input
            type="text"
            onChange={changeHandler}
            name="username"
            placeholder="Username"
          />
          <br />
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
          <input
            type="password"
            onChange={changeHandler}
            name="confirmedpassword"
            placeholder="Confirm Password"
          />
          <br />
          <input
            type="text"
            onChange={changeHandler}
            name="age"
            placeholder="Age"
          />
          <br />
          <input
            type="text"
            onChange={changeHandler}
            name="gender"
            placeholder="Gender"
          />
          <br />
          <input
            type="text"
            onChange={changeHandler}
            name="location"
            placeholder="Location"
          />
          <br />
          <input
            type="text"
            onChange={changeHandler}
            name="contact"
            placeholder="Contact (Mobile or Email)"
          />{" "}
          <br />
          <input type="submit" value="Register" /> <br />
        </form>
      </center>
    </div>
  );
};

export default Register;
