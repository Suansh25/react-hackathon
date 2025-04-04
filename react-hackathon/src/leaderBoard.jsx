import React, { useEffect, useState } from "react";
import { getLeaderboard } from "./leaderboardService";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      const data = await getLeaderboard();
      setLeaders(data);
    };
    fetchLeaders();
  }, []);

  return (
    <div>
      <h2>🏆 Leaderboard</h2>
      <ul>
        {leaders.length === 0 ? (
          <p>No leaderboard data available.</p>
        ) : (
          leaders.map((user, index) => (
            <li key={user.id}>
              {index + 1}. {user.name} - {user.points} pts ({user.badge})
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Leaderboard;
