import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "./Nav.css";

function Nav() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(""); // 🔹 Store username separately
    const [points, setPoints] = useState(0);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                await fetchUserDetails(currentUser.uid); // 🔹 Fetch details
            } else {
                setUser(null);
                setUsername("");
                setPoints(0);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchUserDetails = async (userId) => {
        try {
            const userRef = doc(db, "users", userId);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const userData = userSnap.data();
                setUsername(userData.name || "User"); // 🔹 Get name from Firestore
                setPoints(userData.points || 0);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        setUsername("");
        setPoints(0);
    };

    return (
        <div className="Container">
            <header className="header">
                <div className="logo">
                    <span>🗺️ Hyderabad Explorer</span>
                </div>
                <nav className="nav">
                    <ul>
                        <li><a href="#home" className="nav-link active">🏠 Home</a></li>
                        <li><a href="#places" className="nav-link">🏛️ Places</a></li>
                        <li><a href="#game" className="nav-link">🎮 Game</a></li>
                        <li><a href="#planner" className="nav-link">💰 Budget Planner</a></li>
                        <li><a href="#leaderboard" className="nav-link">🏆 Leaderboard</a></li>
                    </ul>
                </nav>
                <div className="user-profile">
                    {user ? (
                        <>
                            <span id="user-info">😄 {username} - {points} pts</span>
                            <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
                        </>
                    ) : (
                        <a href="#login" id="user-info">🔑 Login</a>
                    )}
                </div>
            </header>
        </div>
    );
}

export default Nav;
