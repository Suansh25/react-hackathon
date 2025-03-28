import './Nav.css';

function Nav() {
    return (
        <div className="Container">
        <header className="header">
            <div className="logo">
                <span>🗺️ Hyderabad Explorer</span>
            </div>
            <nav className="nav">
                <ul>
                    <li><a href="#home" className="nav-link active">🏠 Home</a></li>
                    <li><a href="#places" className="nav-link">🏛️ Places</a></li>
                    <li><a href="#game" className="nav-link">🎮 Game</a></li>
                    <li><a href="#planner" className="nav-link">💰 Budget Planner</a></li>
                    <li><a href="#leaderboard" className="nav-link">🏆 Leaderboard</a></li>
                </ul>
            </nav>
            <div className="user-profile">
                <span id="user-points">😄0 pts</span>
            </div>
        </header>
        </div>
    );
}

export default Nav;
