import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

// 🔥 Replace with your Firebase credentials
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING,
    appId: import.meta.env.VITE_FIREBASE_APPID
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
