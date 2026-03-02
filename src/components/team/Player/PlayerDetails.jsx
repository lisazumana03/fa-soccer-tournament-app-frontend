import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlayerById } from '../../../services/playerService';
import './PlayerDetails.css';

export default function PlayerDetails() {
    const { playerId } = useParams();
    const navigate = useNavigate();
    const [player, setPlayer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadPlayerDetails();
    }, [playerId]);

    const loadPlayerDetails = async () => {
        try {
            setIsLoading(true);
            const data = await getPlayerById(playerId);
            setPlayer(data);
        } catch (err) {
            setError('Failed to load player details');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div className="player-details-container"><p>Loading player details...</p></div>;
    }

    if (error) {
        return (
            <div className="player-details-container">
                <div className="error-message">{error}</div>
                <button onClick={() => navigate('/players')}>Back to Players</button>
            </div>
        );
    }

    if (!player) {
        return (
            <div className="player-details-container">
                <p>Player not found</p>
                <button onClick={() => navigate('/players')}>Back to Players</button>
            </div>
        );
    }

    return (
        <div className="player-details-container">
            <header className="player-details-header">
                <h1>Player Career Profile</h1>
            </header>

            <main className="player-details-main">
                <article className="profile-grid">
                    {/* Player Card */}
                    <section className="player-card">
                        <div className="player-photo">
                            <img
                                src={`https://via.placeholder.com/200?text=${player.playerName?.firstName}+${player.playerName?.lastName}`}
                                alt={`${player.playerName?.firstName} ${player.playerName?.lastName}`}
                            />
                        </div>

                        <div className="info-group">
                            <h3>Personal Details</h3>
                            <div className="info-row">
                                <span className="info-label">Full Name:</span>
                                <span className="info-value">
                                    {player.playerName?.firstName} {player.playerName?.middleName ? player.playerName.middleName + ' ' : ''}{player.playerName?.lastName}
                                </span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Player ID:</span>
                                <span className="info-value">{player.playerID}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Date of Birth:</span>
                                <span className="info-value">
                                    {player.playerDateOfBirth ? new Date(player.playerDateOfBirth).toLocaleDateString() : '-'}
                                </span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Nationality:</span>
                                <span className="info-value">{player.playerNationality || '-'}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Gender:</span>
                                <span className="info-value">{player.playerGender || '-'}</span>
                            </div>
                        </div>

                        <div className="info-group">
                            <h3>Physical Attributes</h3>
                            <div className="stats-highlight">
                                <div className="stat-box">
                                    <div className="value">{player.playerHeight || '-'}</div>
                                    <div className="label">Height (cm)</div>
                                </div>
                                <div className="stat-box">
                                    <div className="value">{player.playerWeight || '-'}</div>
                                    <div className="label">Weight (kg)</div>
                                </div>
                                <div className="stat-box">
                                    <div className="value">{player.playerPosition || '-'}</div>
                                    <div className="label">Position</div>
                                </div>
                            </div>
                        </div>

                        <div className="info-group">
                            <h3>Club Information</h3>
                            <div className="info-row">
                                <span className="info-label">Current Club:</span>
                                <span className="info-value">{player.club || '-'}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Kit Number:</span>
                                <span className="info-value">{player.kitNumber || '-'}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">National Team:</span>
                                <span className="info-value">{player.nationalTeam || '-'}</span>
                            </div>
                        </div>

                        {player.playerLocationOfBirth && (
                            <div className="info-group">
                                <h3>Place of Birth</h3>
                                <div className="info-row">
                                    <span className="info-label">City/Town:</span>
                                    <span className="info-value">{player.playerLocationOfBirth.cityOrTown || '-'}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Country:</span>
                                    <span className="info-value">{player.playerLocationOfBirth.country || '-'}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Continent:</span>
                                    <span className="info-value">{player.playerLocationOfBirth.continent || '-'}</span>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Career Timeline */}
                    <section className="content-section">
                        <h2>Career Timeline</h2>
                        <div className="timeline">
                            <div className="timeline-item current">
                                <div className="timeline-header">
                                    <h4>Current Club</h4>
                                    <span className="timeline-date">{new Date().getFullYear()}</span>
                                </div>
                                <div className="timeline-club">
                                    {player.club || 'Unassigned'} — {player.playerPosition || 'Position TBD'}
                                </div>
                                <div className="timeline-content">
                                    Kit #{player.kitNumber || ''}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Statistics Section */}
                    <section className="content-section">
                        <h2>Player Statistics</h2>
                        <table className="stats-table">
                            <tbody>
                                <tr>
                                    <td>Position:</td>
                                    <td>{player.playerPosition || '-'}</td>
                                </tr>
                                <tr>
                                    <td>Height:</td>
                                    <td>{player.playerHeight ? `${player.playerHeight} cm` : '-'}</td>
                                </tr>
                                <tr>
                                    <td>Weight:</td>
                                    <td>{player.playerWeight ? `${player.playerWeight} kg` : '-'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </article>

                <div className="actions">
                    <button className="btn btn-primary" onClick={() => navigate(`/players/edit/${player.playerID}`)}>
                        Edit Player
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigate('/players')}>
                        Back to List
                    </button>
                </div>
            </main>

            <footer className="app-footer">
                © 1994/95–{new Date().getFullYear()} Soccer Tournament Manager
            </footer>
        </div>
    );
}