import { db } from "./firebaseConfig";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

const getLeaderboard = async () => {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, orderBy("points", "desc"));
        const querySnapshot = await getDocs(q);

        let leaderboard = [];
        querySnapshot.forEach((doc) => {
            leaderboard.push({ id: doc.id, ...doc.data() });
        });

        return leaderboard;
    } catch (error) {
        console.error("❌ Error fetching leaderboard:", error.message);
        return [];
    }
};

export { getLeaderboard };
