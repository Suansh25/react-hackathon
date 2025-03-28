import './BadgesDetails.css'
function Badgesdetails() {
    return (<>
     <section id="game" className="section">
            <h2 className="section-title">Complete Challenges & Earn Points</h2>
            <div className="game-container">
                <div className="challenges">
                    <h3>Current Challenges</h3>
                    <div className="challenges-list" id="challenges-list">
                        {/* Challenges will be loaded via JavaScript */}
                    </div>
                </div>
                <div className="upload-area">
                    <h3>Upload Your Photos</h3>
                    <div className="upload-box" id="upload-box">
                        <i className="fas fa-cloud-upload-alt"></i>
                        <p>Drag & drop your photos here or click to browse</p>
                        <input type="file" id="photo-upload" accept="image/*" multiple />
                    </div>
                    <div className="progress-container">
                        <div className="progress-bar" id="progress-bar"></div>
                        <span id="progress-text">0%</span>
                    </div>
                    <button className="btn primary" id="submit-photos" disabled>
                        Submit for Verification
                    </button>
                </div>
            </div>
            
        </section>
    <div class="b-heading">
        <h1>Places (or) Badges</h1>
    </div>
    <div class="b-para">
        <p>Here we can add badges earned or the various places visited.Example tags are as follows:</p>
    </div>
    </>
    )
}
export default Badgesdetails;