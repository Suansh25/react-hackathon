// src/components/Badges/Badges.jsx

import React, { useEffect, useState } from 'react';
import './Badges.css';
import { auth, db } from '../../firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const locationBadges = [
  {
    id: 1,
    title: 'Bronze',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    minPoints: 25,
  },
  {
    id: 2,
    title: 'Bronze+',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    minPoints: 50,
  },
  {
    id: 3,
    title: 'Silver',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    minPoints: 100,
  },
  {
    id: 4,
    title: 'Silver+',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    minPoints: 150,
  },
  {
    id: 5,
    title: 'Gold',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    minPoints: 200,
  },
  {
    id: 6,
    title: 'Platinum',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
    minPoints: 300,
  },
];

const levelBadges = [
  { id: 'bronze', title: 'Bronze Explorer', pointsRequired: 100 },
  { id: 'silver', title: 'Silver Explorer', pointsRequired: 200 },
  { id: 'gold', title: 'Gold Explorer', pointsRequired: 300 },
  { id: 'platinum', title: 'Platinum Explorer', pointsRequired: 500 },
];

function Badges() {
  const [points, setPoints] = useState(null);
  const [CurrentBadgeTitle, setCurrentBadgeTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const userPoints = userData.points || 0;
            setPoints(userPoints);

            // Determine current badge level
            let badge = 'No Badge';
            for (let i = levelBadges.length - 1; i >= 0; i--) {
              if (userPoints >= levelBadges[i].pointsRequired) {
                badge = levelBadges[i].title;
                break;
              }
            }
            setCurrentBadgeTitle(badge);
          } else {
            setPoints(0);
            setCurrentBadgeTitle('No Badge');
          }
          setLoading(false);
        });

        return () => unsubscribeSnapshot();
      } else {
        setPoints(0);
        setCurrentBadgeTitle('Not Logged In');
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const getCurrentLevelBadge = () => {
    if (points === null || points === 0) return null;
    return levelBadges.reduce((highestBadge, badge) => {
      return points >= badge.pointsRequired ? badge : highestBadge;
    }, null);
  };

  const currentLevelBadge = getCurrentLevelBadge();

  return (
    <div className="badges-container">
      <center>
      <h2 className="badges-title">Badges & Achievements</h2>
      <p className="badges-subtitle">
        Earn badges by visiting places and gaining points!
      </p>
      </center>
      {loading ? (
        <p className="loading-message">Loading your badges...</p>
      ) : (
        <>
          <div className="current-badge-section">
            <h3 className="current-badge-title">
              {currentLevelBadge ? (
                <>
                  🎖️ Current Level: {currentLevelBadge.title}
                  <span className="points-display">({points} points)</span>
                </>
              ) : (
                'No badges earned yet'
              )}
            </h3>
          </div>

          <div className="badges-section">
      
            <div className="badges-grid">
              {locationBadges.map((badge) => {
                const unlocked = points >= badge.minPoints;

                return (
                  <div key={badge.id} className={`badge-card ${unlocked ? 'unlocked' : 'locked'}`}>
                    <div className="badge-image-container">
                      <img
                        src={badge.image}
                        alt={badge.title}
                        className="badge-image"
                        style={{
                          filter: unlocked ? 'none' : 'grayscale(100%)',
                          opacity: unlocked ? 1 : 0.9,
                        }}
                      />
                      {!unlocked && (
                        <div className="badge-lock-overlay">
                          <span className="required-points">{badge.minPoints} pts</span>
                        </div>
                      )}
                    </div>
                    <p className="badge-label">{badge.title}</p>
                    {unlocked && <span className="unlocked-badge">✓ Unlocked</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Badges;