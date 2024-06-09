import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { store } from "./App";
import "./Home.css";

const Home = () => {
  const [token, setToken] = useContext(store);
  if (token) {
    return <Navigate to="/myprofile" />;
  }
  return (
    <div className="home-container">
      <h1>Welcome</h1>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Home;
