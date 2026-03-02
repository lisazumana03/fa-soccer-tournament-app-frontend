import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPlayers, deletePlayer } from '../../../services/playerService';
import { getCountries } from '../../../utils/countriesData';
import './PlayerList.css';

const PlayerPositions = ['GK', 'CB', 'LB', 'RB', 'RWB', 'LWB', 'LDM', 'RDM', 'CDM', 'LAM', 'RAM', 'CAM', 'LW', 'RW', 'CF', 'ST'];

export default function PlayerList() {
    const navigate = useNavigate();
    const [players, setPlayers] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');

    const [filters, setFilters] = useState({
        name: '',
        position: '',
        nationality: '',
        club: '',
        status: ''
    });

    useEffect(() => {
        loadPlayers();
        setCountries(getCountries());
    }, []);

    useEffect(() => {
        applyFilters();
    }, [players, filters]);

    const loadPlayers = async () => {
        try {
            setIsLoading(true);
            const data = await getAllPlayers();
            setPlayers(data || []);
        } catch (error) {
            setMessage('Error loading players');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const applyFilters = () => {
        let result = [...players];

        if (filters.name) {
            result = result.filter(p => {
                const fullName = `${p.playerName?.firstName || ''} ${p.playerName?.lastName || ''}`.toLowerCase();
                return fullName.includes(filters.name.toLowerCase());
            });
        }

        if (filters.position) {
            result = result.filter(p => p.playerPosition === filters.position);
        }

        if (filters.nationality) {
            result = result.filter(p => p.playerNationality === filters.nationality);
        }

        if (filters.club) {
            result = result.filter(p => p.club?.toLowerCase().includes(filters.club.toLowerCase()));
        }

        setFilteredPlayers(result);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDelete = async (playerId) => {
        if (window.confirm(`Are you sure you want to delete player ${playerId}?`)) {
            try {
                await deletePlayer(playerId);
                setMessage('Player deleted successfully!');
                loadPlayers();
                setTimeout(() => setMessage(''), 3000);
            } catch (error) {
                setMessage('Error deleting player');
                console.error(error);
            }
        }
    };

    const handleCreateNew = () => {
        navigate('/players/create');
    };

    const handleEdit = (playerId) => {
        navigate(`/players/edit/${playerId}`);
    };

    const handleViewDetails = (playerId) => {
        navigate(`/players/${playerId}`);
    };

    return (
        <div className="player-list-container">
            <header className="player-list-header">
                <h1>Player Registry</h1>
            </header>

            <main className="player-list-main">
                {message && (
                    <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
                        {message}
                    </div>
                )}

                <section className="filters">
                    <div className="filter-group">
                        <label htmlFor="filterName">Player Name</label>
                        <input
                            id="filterName"
                            name="name"
                            type="text"
                            placeholder="Search by name..."
                            value={filters.name}
                            onChange={handleFilterChange}
                        />
                    </div>

                    <div className="filter-group">
                        <label htmlFor="filterPosition">Position</label>
                        <select
                            id="filterPosition"
                            name="position"
                            value={filters.position}
                            onChange={handleFilterChange}
                        >
                            <option value="">All Positions</option>
                            {PlayerPositions.map(pos => (
                                <option key={pos} value={pos}>{pos}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="filterNationality">Nationality</label>
                        <select
                            id="filterNationality"
                            name="nationality"
                            value={filters.nationality}
                            onChange={handleFilterChange}
                        >
                            <option value="">All Countries</option>
                            {countries.map(country => (
                                <option key={country.code} value={country.name}>{country.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="filterClub">Club</label>
                        <input
                            id="filterClub"
                            name="club"
                            type="text"
                            placeholder="Search by club..."
                            value={filters.club}
                            onChange={handleFilterChange}
                        />
                    </div>
                </section>

                <div className="actions">
                    <button className="btn btn-primary" onClick={handleCreateNew}>
                        Add New Player
                    </button>
                </div>

                {isLoading ? (
                    <p className="loading">Loading players...</p>
                ) : (
                    <section className="player-table-section">
                        {filteredPlayers.length === 0 ? (
                            <p className="no-results">No players found matching your criteria.</p>
                        ) : (
                            <table className="player-table">
                                <thead>
                                    <tr>
                                        <th>Player ID</th>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Nationality</th>
                                        <th>Club</th>
                                        <th>Kit #</th>
                                        <th>Height (cm)</th>
                                        <th>Weight (kg)</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPlayers.map(player => (
                                        <tr key={player.playerID}>
                                            <td>{player.playerID}</td>
                                            <td>
                                                {player.playerName?.firstName} {player.playerName?.lastName}
                                            </td>
                                            <td>{player.playerPosition || '-'}</td>
                                            <td>{player.playerNationality || '-'}</td>
                                            <td>{player.club || '-'}</td>
                                            <td>{player.kitNumber || '-'}</td>
                                            <td>{player.playerHeight || '-'}</td>
                                            <td>{player.playerWeight || '-'}</td>
                                            <td className="actions-cell">
                                                <button
                                                    className="btn btn-primary btn-small"
                                                    onClick={() => handleViewDetails(player.playerID)}
                                                    title="View Details"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="btn btn-secondary btn-small"
                                                    onClick={() => handleEdit(player.playerID)}
                                                    title="Edit Player"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-small"
                                                    onClick={() => handleDelete(player.playerID)}
                                                    title="Delete Player"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </section>
                )}
            </main>

            <footer className="app-footer">
                © 1994/95–{new Date().getFullYear()} Soccer Tournament Manager
            </footer>
        </div>
    );
}