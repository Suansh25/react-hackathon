import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h2>Hyderabad Explorer</h2>
                    <p>Making city exploration fun and rewarding for everyone</p>
                </div>
                <div className="footer-section">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#places">Places</a></li>
                        <li><a href="#game">Game</a></li>
                        <li><a href="#planner">Planner</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h2>Contact</h2>
                    <p>info@hyderabadexplorer.com</p>
                    <p>+91 9876564321</p>
                </div>
            </div>
            <div className="footer-bottom">
                <h2>&copy; 2025 Hyderabad Explorer. All rights reserved.</h2>
            </div>
        </footer>
    );
}

export default Footer;
