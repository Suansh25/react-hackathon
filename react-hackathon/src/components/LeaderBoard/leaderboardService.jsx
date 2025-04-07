// src/components/Leaderboard/leaderboardService.js
import { db } from "../../firebaseConfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export const subscribeToLeaderboard = (callback) => {
  const q = query(collection(db, "users"), orderBy("points", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(users);
  });

  return unsubscribe;
};
