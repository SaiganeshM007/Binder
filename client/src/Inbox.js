import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Inbox = () => {
  const navigate = useNavigate();
  const loggedInUserId = "currentUserId";
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/conversations/${loggedInUserId}`
        );
        setConversations(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchConversations();
  }, [loggedInUserId]);

  const handleOpenChat = (userId) => {
    navigate(`/chat/${userId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Inbox</h1>
      <ul>
        {conversations.map((user) => (
          <li key={user._id}>
            <strong>Username:</strong> {user.username} <br />
            <strong>Age:</strong> {user.age} <br />
            <strong>Location:</strong> {user.location} <br />
            <strong>Gender:</strong> {user.gender} <br />
            <button onClick={() => handleOpenChat(user._id)}>Open Chat</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;
