import { useState, useEffect } from "react";
import { auth, db, signInWithGoogle } from "../../firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import "./User.css";

function User() {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        let unsubscribeUserData = null;

        const unsubscribeAuth = onAuthStateChanged(auth, async (loggedInUser) => {
            if (loggedInUser) {
                setUser(loggedInUser);

                const userRef = doc(db, "users", loggedInUser.uid);

                // Real-time updates for user data
                unsubscribeUserData = onSnapshot(userRef, async (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setUserData(data);

                        // Auto badge update logic
                        let newBadge = "Bronze";
                        const points = data.points || 0;

                        if (points >= 500) newBadge = "Diamond";
                        else if (points >= 300) newBadge = "Platinum";
                        else if (points >= 200) newBadge = "Gold";
                        else if (points >= 100) newBadge = "Silver";

                        if (data.badge !== newBadge) {
                            await setDoc(userRef, { ...data, badge: newBadge });
                        }
                    }
                });
            } else {
                setUser(null);
                setUserData(null);
                if (unsubscribeUserData) unsubscribeUserData();
            }
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeUserData) unsubscribeUserData();
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegister) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const newUser = userCredential.user;
                await setDoc(doc(db, "users", newUser.uid), {
                    name,
                    email,
                    points: 0,
                    badge: "Bronze",
                });
                alert("User Registered Successfully!");
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                alert("Logged in Successfully!");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        alert("Logged out successfully!");
    };

    return (
        <section className="user">
            <div className="user-text">
                {user ? (
                    <div className="user-details">
                        <h1>Welcome, {userData?.name}!</h1>
                        <h2>{user.email}</h2>
                        <div className="user-stats">
                            <div className="stat-box">
                                <span className="stat-number">{userData?.points ?? 0}+</span>
                                <p>Points</p>
                            </div>
                            <div className="stat-box">
                                <span className="stat-number">{userData?.badge ?? "Bronze"}</span>
                                <p>Badge</p>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="logout-btn1">Logout</button>
                    </div>
                ) : (
                    <div className="loginForm">
                        <h2>{isRegister ? "Register" : "Login"}</h2>
                        <form onSubmit={handleSubmit}>
                            {isRegister && (
                                <input
                                    type="text"
                                    placeholder="Enter Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            )}
                            <input
                                type="email"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit">{isRegister ? "Register" : "Login"}</button>
                        </form>
                        <button className="google-btn" onClick={signInWithGoogle}>
                            Sign in with Google
                        </button>
                        <p onClick={() => setIsRegister(!isRegister)} className="toggle-text">
                            {isRegister ? "Already have an account? Login" : "New user? Register here"}
                        </p>
                    </div>
                )}
            </div>
            <div className="user-image">
                <img src="./UserImages/User.png" alt="Traveler" />
            </div>
        </section>
    );
}

export default User;
