// src/App.jsx
import React, { useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import Nav from './components/Nav/Nav.jsx';
import Home from './components/Home/Home.jsx';
import './App.css';
import SecondPagetitle from './components/SecondPage/SecondPagetitle.jsx';
import Card from './components/Card/Card.jsx';
import Badgedetails from './components/SecondPage/Badgesdetails.jsx';
import User from './components/User/User.jsx';
import Footer from './components/Footer/Footer.jsx';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import Planner from './components/Planner/Planner.jsx';
import LeaderBoard from './components/LeaderBoard/Leaderboard.jsx';
import Badges from "./components/Badges/Badges.jsx"; // ✅ Make sure this is updated

function App() {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [visitedPlaces, setVisitedPlaces] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setPoints(data.points || 0);
          setVisitedPlaces(data.visitedPlaces || []);
        }
      } else {
        setUser(null);
        setPoints(0);
        setVisitedPlaces([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleVisit = async (placeName, earnedPoints) => {
    if (visitedPlaces.includes(placeName)) return;

    const newPoints = points + earnedPoints;
    const newVisited = [...visitedPlaces, placeName];

    setPoints(newPoints);
    setVisitedPlaces(newVisited);

    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        points: newPoints,
        visitedPlaces: newVisited,
      });
    }
  };

  const arr = [
    { image: "./CardImages/charminar.jpg", title: "Charminar", desc: "Historic monument in Hyderabad", a: "https://w.wiki/AT8w", points: 15 },
    { image: "./CardImages/tankbund.jpg", title: "TankBund", desc: "Scenic waterfront road", a: "https://w.wiki/AT8w", points: 10 },
    { image: "./CardImages/golkonda.jpg", title: "Golconda", desc: "Ancient fort with rich history", a: "https://w.wiki/AT8w", points: 20 },
    { image: "./CardImages/chowmahalla palace.jpg", title: "City Mall", desc: "Popular shopping center", a: "https://w.wiki/AT8w", points: 5 },
  ];

  return (
    <>
      <Nav user={user} points={points} />
      <div style={{ padding: "3rem" }}>
        <section id="home"><Home /></section>
        
      </div>

      <br /><br /><br /><br /><br />
      <hr /><section id="game">
      <Badgedetails />
      </section>
      <hr /><Badges points={points} /> 
      <hr />
      <section id="login">
      <User />
      </section>
      <hr />
     <section id="planner">
      <Planner />
      </section>
      <hr />
      
      <SecondPagetitle />
      

      <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem", justifyContent: "center", paddingBottom: "20vh" }}>
        {arr.map((value, index) => (
          <Card
            key={index}
            data={value}
            onVisit={handleVisit}
            visited={visitedPlaces.includes(value.title)}
          />
        ))}
      </div>
      <hr /><br /><br /><br />
      <section id="leaderboard">
      <LeaderBoard />
      </section><br /><br /><br />
      <hr />
      <Footer />
    </>
  );
}

export default App;
