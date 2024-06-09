import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Register from "./Register";
import Login from "./Login";
import Myprofile from "./Myprofile";
import AddBook from "./AddBook";
import SearchResults from "./SearchResults";
import Home from "./Home";

export const store = createContext();

function App() {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken || null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <store.Provider value={[token, setToken]}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myprofile" element={<Myprofile />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/search/:query" element={<SearchResults />} />
        </Routes>
      </BrowserRouter>
    </store.Provider>
  );
}

export default App;
