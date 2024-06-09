import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { store } from "./App";
import styles from "./Nav.css";

const Nav = () => {
  const [token, setToken] = useContext(store);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <div className={styles.navbar}>
      <h1>Binder</h1>
      {token && (
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search books by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      )}
    </div>
  );
};

export default Nav;
