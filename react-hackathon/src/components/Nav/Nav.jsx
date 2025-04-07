import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import "./Nav.css";

function Nav() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [points, setPoints] = useState(0);
    const [animate, setAnimate] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        let unsubscribeUserSnapshot = null;

        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);

                const userRef = doc(db, "users", currentUser.uid);
                unsubscribeUserSnapshot = onSnapshot(userRef, (docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        setUsername(userData.name || "User");

                        setPoints((prevPoints) => {
                            if (prevPoints !== userData.points) {
                                setAnimate(true);
                                setTimeout(() => setAnimate(false), 400);
                            }
                            return userData.points || 0;
                        });
                    }
                });
            } else {
                setUser(null);
                setUsername("");
                setPoints(0);
                if (unsubscribeUserSnapshot) unsubscribeUserSnapshot();
            }
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeUserSnapshot) unsubscribeUserSnapshot();
        };
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        setUsername("");
        setPoints(0);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="container">
            <header className="header">
                <div className="header-top">
                    <div className="logo">
                        <span>🗺️ Hyderabad Explorer</span>
                    </div>
                   
                </div>
                <button className="menu-toggle" onClick={toggleMenu}>☰</button>
                <nav className={`nav ${menuOpen ? "open" : ""}`}>
                    <ul>
                        <li><a href="#home" className="nav-link active">🏠 Home</a></li>
                        <li><a href="#places" className="nav-link">🏛️ Places</a></li>
                        <li><a href="#game" className="nav-link">🎮 Game</a></li>
                        <li><a href="#planner" className="nav-link">💰 Budget Planner</a></li>
                        <li><a href="#leaderboard" className="nav-link">🏆 Leaderboard</a></li>
                        <li><div className="user-profile">
                    {user ? (
                        <>
                            <span
                                id="user-info"
                                className={animate ? "animate-pop" : ""}
                            >
                                😄 {username} - {points} pts
                            </span>
                            <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
                        </>
                    ) : (
                        <a href="#login" id="user-info">🔑 Login</a>
                    )}
                </div></li>
                    </ul>
                </nav>
                
            </header>
        </div>
    );
}

export default Nav;
