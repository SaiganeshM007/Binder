import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SearchResults.css";

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/search?name=${query}`)
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="search-results-container">
      <h1>Search Results for "{query}"</h1>
      <ul>
        {results.map((result) => (
          <li key={result._id}>
            <strong>Book Name</strong>: {result.name} <br />
            <strong>User</strong>: {result.user.username} <br />
            <strong>Age</strong>: {result.user.age} <br />
            <strong>Location</strong>: {result.user.location} <br />
            <strong>Gender</strong>: {result.user.gender} <br />
            <strong>Contact</strong>: {result.user.contact}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
