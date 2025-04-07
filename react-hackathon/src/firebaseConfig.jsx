import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

// 🔥 Replace with your Firebase credentials
const firebaseConfig = {
    apiKey: "AIzaSyCOI1O_-J4jn20ZAlaWb2K_sNV2krUouFM",
  authDomain: "tour-planner-155a8.firebaseapp.com",
  projectId: "tour-planner-155a8",
  storageBucket: "tour-planner-155a8.firebasestorage.app",
  messagingSenderId: "84452382686",
  appId: "1:84452382686:web:bedf2590d962afd2daaf4f"

};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🔹 Google Sign-In Function
const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const userRef = doc(db, "users", user.uid);

        const docSnap = await getDoc(userRef);
        if (!docSnap.exists()) {
            await setDoc(userRef, {
                name: user.displayName,
                email: user.email,
                points: 0,
                badge: "Bronze"
            });
        }
    } catch (error) {
        console.error("❌ Google Sign-In Error:", error.message);
    }
};

// 🔹 Visit Place (Update Points)
const visitPlace = async (userId) => {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
        const currentPoints = docSnap.data().points;
        const newPoints = currentPoints + 10; // Adds 10 points per visit
        let newBadge = "Bronze";

        if (newPoints >= 50) newBadge = "Silver";
        if (newPoints >= 100) newBadge = "Gold";
        if (newPoints >= 200) newBadge = "Platinum";

        await updateDoc(userRef, { points: newPoints, badge: newBadge });
        console.log("✅ Points Updated:", newPoints, "New Badge:", newBadge);
    } else {
        console.log("⚠️ User does not exist in Firestore!");
    }
};

// 🔹 Listen for Auth Changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("✅ User Signed In:", user.displayName);
    } else {
        console.log("🔴 No user signed in.");
    }
});

export { db, auth, provider, signInWithGoogle, visitPlace };
