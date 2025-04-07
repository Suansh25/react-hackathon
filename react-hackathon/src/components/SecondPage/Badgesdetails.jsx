// src/components/BadgesDetails.jsx
import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Badges from "../Badges/Badges.jsx"; // Import the reusable component
import './BadgesDetails.css';

const challengesData = [
    { id: 1, title: "Historical Explorer", description: "Visit 3 historical places in Hyderabad", points: 100 },
    { id: 2, title: "Weekend Adventurer", description: "Visit any 2 tourist spots in a single weekend", points: 75 },
    { id: 3, title: "First Step", description: "Visit your first place in Hyderabad", points: 50 },
    { id: 4, title: "Modern Explorer", description: "Visit 2 modern attractions in Hyderabad", points: 80 },
];

const badgesData = [
    { id: "bronze", title: "Bronze Explorer", pointsRequired: 100, image: "https://cdn-icons-png.flaticon.com/512/2583/2583139.png" },
    { id: "silver", title: "Silver Explorer", pointsRequired: 200, image: "https://cdn-icons-png.flaticon.com/512/1826/1826490.png" },
    { id: "gold", title: "Gold Explorer", pointsRequired: 300, image: "https://cdn-icons-png.flaticon.com/512/1826/1826485.png" },
    { id: "platinum", title: "Platinum Explorer", pointsRequired: 500, image: "https://cdn-icons-png.flaticon.com/512/1826/1826497.png" },
];

function BadgesDetails() {
    const [challenges, setChallenges] = useState([]);
    const [badges, setBadges] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                await loadUserData(currentUser.uid);
            } else {
                setUser(null);
                setChallenges(challengesData.map(ch => ({ ...ch, completed: false })));
                setBadges([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const loadUserData = async (userId) => {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            const completedChallenges = userData.completedChallenges || [];
            const userPoints = userData.points || 0;

            setChallenges(challengesData.map(ch => ({
                ...ch,
                completed: completedChallenges.includes(ch.id),
            })));

            setBadges(badgesData.map(badge => ({
                ...badge,
                unlocked: userPoints >= badge.pointsRequired
            })));
        } else {
            setChallenges(challengesData.map(ch => ({ ...ch, completed: false })));
            setBadges(badgesData.map(badge => ({ ...badge, unlocked: false })));
        }
    };

    const toggleChallenge = async (challengeId) => {
        if (!user) {
            alert("Please log in to complete challenges.");
            return;
        }

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            let updatedChallenges = userData.completedChallenges || [];
            let updatedPoints = userData.points || 0;

            const challenge = challenges.find(ch => ch.id === challengeId);
            if (!challenge) return;

            if (updatedChallenges.includes(challengeId)) {
                updatedChallenges = updatedChallenges.filter(id => id !== challengeId);
                updatedPoints -= challenge.points;
            } else {
                updatedChallenges.push(challengeId);
                updatedPoints += challenge.points;
            }

            await updateDoc(userRef, {
                completedChallenges: updatedChallenges,
                points: updatedPoints,
            });

            setChallenges(challenges.map(ch =>
                ch.id === challengeId ? { ...ch, completed: !ch.completed } : ch
            ));

            setBadges(badgesData.map(badge => ({
                ...badge,
                unlocked: updatedPoints >= badge.pointsRequired
            })));
        }
    };

    return (
        <section id="game" className="section">
            <center>
                <h1 className="section-title">Complete Challenges & Earn Points</h1>
            </center>

            <div className="content-wrapper">
                {/* Challenges */}
                <div className="challenges">
                    <h3>Current Challenges</h3>
                    <div className="challenges-list">
                        {challenges.map(challenge => (
                            <div key={challenge.id} className={`challenge-item ${challenge.completed ? 'completed' : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={challenge.completed}
                                    onChange={() => toggleChallenge(challenge.id)}
                                />
                                <div className="challenge-details">
                                    <h4>{challenge.title}</h4>
                                    <p>{challenge.description}</p>
                                    <div className="challenge-points">
                                        <span>{challenge.points} points</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

export default BadgesDetails;
