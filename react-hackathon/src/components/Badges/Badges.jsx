import './Badges.css';

function Badges({ points }) {
    // Badge Levels with Unlock Criteria
    const badgeLevels = [
        { title: "Beginner", image: "/BadgeImages/pyramid.png", minPoints: 0 },
        { title: "Intermediate", image: "/BadgeImages/tower.png", minPoints: 50 },
        { title: "Proficient", image: "/BadgeImages/build.png", minPoints: 100 },
        { title: "Expert", image: "/BadgeImages/mountain.png", minPoints: 200 },
        { title: "God-level Expert", image: "/BadgeImages/desert.png", minPoints: 500 }
    ];

    // Filter only unlocked badges
    const unlockedBadges = badgeLevels.filter(badge => points >= badge.minPoints);

    return (
        <div className="badges-container">
            {unlockedBadges.map((badge, index) => (
                <div className="badge-card" key={index}>
                    <h3>{badge.title}</h3>
                    <div className="badge-image">
                        <img src={badge.image} className="badge-thumb" alt={badge.title} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Badges;
