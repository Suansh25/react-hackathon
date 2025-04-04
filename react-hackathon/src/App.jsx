import React, { useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import Nav from './components/Nav/Nav.jsx';
import Home from './components/Home/Home.jsx';
import './App.css';
import SecondPagetitle from './components/SecondPage/SecondPagetitle.jsx';
import Card from './components/Card/Card.jsx';
import Badges from './components/Badges/Badges.jsx';
import Badgedetails from './components/SecondPage/Badgesdetails.jsx';
import User from './components/User/User.jsx';
import Footer from './components/Footer/Footer.jsx';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import Planner from './components/Planner/Planner.jsx';

function App() {
  // User state
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    // Listen for authentication changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch user's points from Firestore
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setPoints(userSnap.data().points || 0);
        }
      } else {
        setUser(null);
        setPoints(0);
      }
    });

    return () => unsubscribe();
  }, []);

  let arr = [
    { image: "./CardImages/DC.jpeg", title: "Charminar", desc: "This is a good place called Charminar" },
    { image: "./CardImages/man.png", title: "TankBund", desc: "This is a good place called Tank Bund" },
    { image: "./CardImages/river.png", title: "Golconda", desc: "This is a good place called Golconda" },
    { image: "./CardImages/woman.png", title: "City Mall", desc: "This is a good place called City Mall" },
  ];

  return (
    <>
      {/* Pass user and points to Navbar */}
      <Nav user={user} points={points} />
      <div style={{ padding: "3rem" }}>
        <Home />
      </div>
      <br /><br /><br /><br /><br />
      <hr />
      <Badgedetails />
      
     

     
      
      <hr />
      <User />
      <hr />
      <SecondPagetitle />
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem", justifyContent: "center", paddingBottom: "20vh" }}>
        {arr.map((value, index) => <Card key={index} data={value} />)}
      </div>
      
      <hr />
      <Planner />
      <hr />
      <Footer />
    </>
  );
}

export default App;
