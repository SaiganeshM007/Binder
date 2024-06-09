import React, { useContext, useState } from "react";
import { store } from "./App";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddBook.css";

const AddBook = () => {
  const navigate = useNavigate();
  const [token, setToken] = useContext(store);
  const [data, setData] = useState({
    name: "",
    author: "",
    genre: "",
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/addbook", data, {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => {
        alert("Book Added Successfully");

        setData({
          name: "",
          author: "",
          genre: "",
        });
      })
      .catch((err) => console.log(err));
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <form onSubmit={submitHandler} className="form">
        <h3>Add Book</h3>
        <input
          type="text"
          onChange={changeHandler}
          name="name"
          placeholder="Book Name"
          value={data.name}
        />
        <input
          type="text"
          onChange={changeHandler}
          name="author"
          placeholder="Author"
          value={data.author}
        />
        <input
          type="text"
          onChange={changeHandler}
          name="genre"
          placeholder="Genre"
          value={data.genre}
        />
        <input type="submit" value="Add Book" />
      </form>
    </div>
  );
};

export default AddBook;
