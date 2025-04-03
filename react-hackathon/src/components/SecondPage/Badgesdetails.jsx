import { useEffect, useState, useRef } from "react";
import './BadgesDetails.css';

const challengesData = [
    { id: 1, title: "Historical Explorer", description: "Visit 3 historical places in Hyderabad", points: 100, completed: false },
    { id: 2, title: "Weekend Adventurer", description: "Visit any 2 tourist spots in a single weekend", points: 75, completed: false },
    { id: 3, title: "First Step", description: "Visit your first place in Hyderabad", points: 50, completed: true },
    { id: 4, title: "Modern Explorer", description: "Visit 2 modern attractions in Hyderabad", points: 80, completed: false },
];

function Badgesdetails() {
    const [challenges, setChallenges] = useState(challengesData);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const fileInputRef = useRef(null);
    const uploadBoxRef = useRef(null);
    const progressBarRef = useRef(null);
    const progressTextRef = useRef(null);

    useEffect(() => {
        console.log("Component Mounted. Challenges Loaded.");
    }, []);

    const handleFiles = (files) => {
        const newFiles = Array.from(files);
        setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);

        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 20;
            if (progressBarRef.current) {
                progressBarRef.current.style.width = `${progress}%`;
            }
            if (progressTextRef.current) {
                progressTextRef.current.innerText = `${progress}%`;
            }
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 500);
    };

    return (
        <>
            <section id="game" className="section">
                <center>
                <h1 className="section-title">Complete Challenges & Earn Points</h1>
                </center>
                <div className="game-container">
                    <div className="challenges">
                        <h3>Current Challenges</h3>
                        <div className="challenges-list">
                            {challenges.map(challenge => (
                                <div key={challenge.id} className={`challenge-item ${challenge.completed ? 'completed' : ''}`}>
                                    <i className={`fas ${challenge.completed ? 'fa-check-circle' : 'fa-flag'}`}></i>
                                    <div className="challenge-details">
                                        <h4>{challenge.title}</h4>
                                        <p>{challenge.description}</p>
                                        <div className="challenge-points">
                                            <i className="fas fa-star"></i>
                                            <span>{challenge.points} points</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="upload-area">
                        <h3>Upload Your Photos</h3>
                        <div
                            className="upload-box"
                            ref={uploadBoxRef}
                            onClick={() => fileInputRef.current.click()}
                            onDragOver={(e) => {
                                e.preventDefault();
                                uploadBoxRef.current.style.borderColor = '#4a6bff';
                                uploadBoxRef.current.style.backgroundColor = 'rgba(74, 107, 255, 0.05)';
                            }}
                            onDragLeave={() => {
                                uploadBoxRef.current.style.borderColor = '#ddd';
                                uploadBoxRef.current.style.backgroundColor = 'transparent';
                            }}
                            onDrop={(e) => {
                                e.preventDefault();
                                uploadBoxRef.current.style.borderColor = '#ddd';
                                uploadBoxRef.current.style.backgroundColor = 'transparent';
                                handleFiles(e.dataTransfer.files);
                            }}
                        >
                            <i className="fas fa-cloud-upload-alt"></i>
                            <p>Drag & drop your photos here or click to browse</p>
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                multiple
                                hidden
                                onChange={(e) => handleFiles(e.target.files)}
                            />
                        </div>
                        <div className="progress-container">
                            <div className="progress-bar" ref={progressBarRef}></div>
                            <span ref={progressTextRef}>0%</span>
                        </div>
                        <button
                            className="btn primary"
                            disabled={uploadedFiles.length === 0}
                            onClick={() => alert("Photos Submitted!")}
                        >
                            Submit for Verification
                        </button>
                    </div>
                </div>
            </section>
            <center>
            <div className="b-heading">
                <h1>Places (or) Badges</h1>
            </div>
            <div className="b-para">
                <p>Here we can add badges earned or the various places visited. Example tags are as follows:</p>
            </div>
            </center>
        </>
    );
}

export default Badgesdetails;
