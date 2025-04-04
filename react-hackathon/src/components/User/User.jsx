import { useState } from "react";
import { auth, db, signInWithGoogle } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./User.css";

function User() {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegister) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await setDoc(doc(db, "users", user.uid), {
                    name,
                    email,
                    points: 0,
                    badge: "Bronze"
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

    return (
        <section className="user">
            <div className="user-text">
                <div className="loginForm">
                    <h2>{isRegister ? "Register" : "Login"}</h2>
                    <form onSubmit={handleSubmit}>
                        {isRegister && (
                            <input type="text" id="name" placeholder="Enter Your Name"
                                value={name} onChange={(e) => setName(e.target.value)} required />
                        )}
                        <input type="email" id="email" placeholder="Enter your Email"
                            value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" id="password" placeholder="Enter Password"
                            value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit">{isRegister ? "Register" : "Login"}</button>
                    </form>
                    <button className="google-btn" onClick={signInWithGoogle}>
                        Sign in with Google
                    </button>
                    <p onClick={() => setIsRegister(!isRegister)} className="toggle-text">
                        {isRegister ? "Already have an account? Login" : "New user? Register here"}
                    </p>
                </div>
            </div>
            <div className="user-image">
                <img src="./UserImages/User.png" alt="Traveler" />
            </div>
        </section>
    );
}

export default User;
