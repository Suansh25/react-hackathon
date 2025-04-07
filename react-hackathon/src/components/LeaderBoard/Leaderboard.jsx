// src/components/Leaderboard/Leaderboard.jsx
import React, { useEffect, useState } from "react";
import { subscribeToLeaderboard } from "./leaderboardService";
import "./Leaderboard.css"; // Optional: style it nicely!

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToLeaderboard(setLeaders);
    return () => unsubscribe(); // Clean up on unmount
  }, []);

  return (
    <div className="leaderboard">
      <h2>🏆 Live Leaderboard</h2>
      {leaders.length === 0 ? (
        <p>No leaderboard data available.</p>
      ) : (
        <ul>
          {leaders.map((user, index) => (
            <li key={user.id}>
              <strong>{index + 1}.</strong> {user.name} – {user.points} pts{" "}
              <span className="badge">({user.badge})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
