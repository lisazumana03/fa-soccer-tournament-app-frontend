import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePlayer.css';

export default function CreatePlayer() {
    const navigate = useNavigate();

    const handleStartCreation = () => {
        navigate('/player-management');
    };

    return (
        <div className="create-player-container">
            <h1>Create Player</h1>
            <div className="create-player-content">
                <p>Click below to proceed to the Player Management form where you can create a new player with all their details.</p>
                <button className="btn btn-primary" onClick={handleStartCreation}>
                    Go to Player Management
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/players')}>
                    Back to Player List
                </button>
            </div>
        </div>
    );
}