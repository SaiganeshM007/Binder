import React, { useContext, useEffect, useState } from "react";
import { store } from "./App";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Myprofile.css";

const Myprofile = () => {
  const navigate = useNavigate();
  const [token, setToken] = useContext(store);
  const [data, setData] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/myprofile", {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/books", {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }, [token]);

  const deleteBook = async (bookId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/deletebook/${bookId}`,
        {
          headers: {
            "x-token": token,
          },
        }
      );
      alert(response.data);

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={styles.container}>
      {data ? (
        <div className={styles.profile}>
          <center>
            <p>Welcome user: {data.username}</p>
            <button onClick={() => navigate("/addbook")}>Add Book</button>
            <button onClick={() => setToken(null)}>Sign out</button>
          </center>
          {books.length > 0 ? (
            <div className={styles.books}>
              <ul>
                Books Listed:
                {books.map((book) => (
                  <li key={book._id}>
                    {book.name}
                    <button onClick={() => deleteBook(book._id)}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Oh no books listed</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Myprofile;
