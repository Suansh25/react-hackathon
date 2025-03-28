import './Home.css';

function Home() {
    return (
        <div className="container">
            <section id="home" className="section active">
                <div className="hero">
                    <h1>Discover Hyderabad Like Never Before</h1>
                    <p>Turn your city exploration into an exciting game with rewards and challenges!</p>
                    <div className="cta-buttons">
                        <a href="#game" className="btn primary">Start Exploring</a>&nbsp;
                        <a href="#planner" className="btn secondary">Plan Your Trip</a>
                    </div>
                </div>
                <div className="features">
                    <div className="feature-card">
                        <span>📸</span>
                        <h3>Capture & Earn</h3>
                        <p>Upload photos from historical places to earn points and badges</p>
                    </div>
                    <div className="feature-card">
                        <span>🗺️</span>
                        <h3>Smart Planner</h3>
                        <p>Get personalized recommendations based on your budget</p>
                    </div>
                    <div className="feature-card">
                        <span>🏆</span>
                        <h3>Compete & Win</h3>
                        <p>Climb the leaderboard and unlock special rewards</p>
                    </div>
                </div>
            </section>
        </div>  
    );
}

export default Home;
