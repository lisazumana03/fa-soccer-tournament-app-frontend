import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPlayer, updatePlayer, getPlayerById } from '../../../services/playerService';
import { getCountries } from '../../../utils/countriesData';
import './PlayerPage.css';

const PlayerPositions = ['GK', 'CB', 'LB', 'RB', 'RWB', 'LWB', 'LDM', 'RDM', 'CDM', 'LAM', 'RAM', 'CAM', 'LW', 'RW', 'CF', 'ST'];

export default function PlayerPage() {
    const navigate = useNavigate();
    const { playerId } = useParams();
    const [countries, setCountries] = useState([]);
    const [isEditMode, setIsEditMode] = useState(!!playerId);
    const [formData, setFormData] = useState({
        playerID: '',
        playerName: { firstName: '', middleName: '', lastName: '' },
        playerGender: '',
        playerNationality: '',
        playerDateOfBirth: '',
        playerLocationOfBirth: {
            suburb: '',
            cityOrTown: '',
            stateOrProvince: '',
            country: '',
            continent: '',
            zipCodeOrPostalCode: '',
            latitude: 0,
            longitude: 0
        },
        playerPosition: '',
        playerHeight: '',
        playerWeight: '',
        club: null,
        kitNumber: 0,
        nationalTeam: null,
    });

    const [transferData, setTransferData] = useState({
        transferType: 'none',
        transferFrom: '',
        transferTo: '',
        transferFee: 0,
        transferDate: '',
        transferWindow: 'winter-2026'
    });

    const [loanData, setLoanData] = useState({
        loanClub: '',
        loanStart: '',
        loanEnd: '',
        loanFee: 0,
        optionToBuy: 0,
        recallClause: ''
    });

    const [season, setSeason] = useState('2025-26');
    const [registrationStatus, setRegistrationStatus] = useState('active');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setCountries(getCountries());
        
        if (isEditMode && playerId) {
            loadPlayerData();
        }
    }, [playerId, isEditMode]);

    const loadPlayerData = async () => {
        try {
            const playerData = await getPlayerById(playerId);
            setFormData({
                playerID: playerData.playerID,
                playerName: playerData.playerName || { firstName: '', middleName: '', lastName: '' },
                playerGender: playerData.playerGender || '',
                playerNationality: playerData.playerNationality || '',
                playerDateOfBirth: playerData.playerDateOfBirth || '',
                playerLocationOfBirth: playerData.playerLocationOfBirth || {
                    suburb: '',
                    cityOrTown: '',
                    stateOrProvince: '',
                    country: '',
                    continent: '',
                    zipCodeOrPostalCode: '',
                    latitude: 0,
                    longitude: 0
                },
                playerPosition: playerData.playerPosition || '',
                playerHeight: playerData.playerHeight || '',
                playerWeight: playerData.playerWeight || '',
                club: playerData.club || null,
                kitNumber: playerData.kitNumber || 0,
                nationalTeam: playerData.nationalTeam || null,
            });
        } catch (error) {
            setMessage('Error loading player data');
            console.error(error);
        }
    };

    const handleNameChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            playerName: { ...prev.playerName, [field]: value }
        }));
    };

    const handleLocationChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            playerLocationOfBirth: { ...prev.playerLocationOfBirth, [field]: value }
        }));
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'playerHeight' || name === 'playerWeight' || name === 'kitNumber' 
                ? parseFloat(value) || 0 
                : value
        }));
    };

    const handleTransferChange = (e) => {
        const { name, value } = e.target;
        setTransferData(prev => ({
            ...prev,
            [name]: name === 'transferFee' ? parseFloat(value) || 0 : value
        }));
    };

    const handleLoanChange = (e) => {
        const { name, value } = e.target;
        setLoanData(prev => ({
            ...prev,
            [name]: name === 'loanFee' || name === 'optionToBuy' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            // Prepare player data matching backend Player entity
            const playerPayload = {
                ...formData,
                playerHeight: parseFloat(formData.playerHeight) || 0,
                playerWeight: parseFloat(formData.playerWeight) || 0,
                kitNumber: parseInt(formData.kitNumber) || 0
            };

            if (isEditMode) {
                await updatePlayer(formData.playerID, playerPayload);
                setMessage('Player updated successfully!');
            } else {
                if (!formData.playerID) {
                    setMessage('Error: Player ID is required');
                    setIsLoading(false);
                    return;
                }
                const result = await createPlayer(playerPayload);
                setMessage('Player created successfully!');
                setFormData({ ...formData, playerID: result.playerID });
            }

            setTimeout(() => {
                navigate('/players');
            }, 1500);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="player-page-container">
            <header className="player-page-header">
                <h1>{isEditMode ? 'Edit Player' : 'Create Player'}</h1>
                <div className="season-info">
                    <span className="badge season">Season 2025/26</span>
                    <span className="badge transfer-open" id="transferStatus">Transfer Window: OPEN</span>
                </div>
            </header>

            <main className="player-page-main">
                {message && (
                    <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="player-form">
                    {/* Personal Information Section */}
                    <section className="form-section">
                        <h2>Personal Information</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="playerID">Player ID</label>
                                <input
                                    id="playerID"
                                    name="playerID"
                                    placeholder="Enter Player ID"
                                    value={formData.playerID}
                                    onChange={handleFormChange}
                                    readOnly={isEditMode}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    id="firstName"
                                    placeholder="First Name"
                                    value={formData.playerName.firstName}
                                    onChange={(e) => handleNameChange('firstName', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="middleName">Middle Name</label>
                                <input
                                    id="middleName"
                                    placeholder="Middle Name (optional)"
                                    value={formData.playerName.middleName}
                                    onChange={(e) => handleNameChange('middleName', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    id="lastName"
                                    placeholder="Last Name"
                                    value={formData.playerName.lastName}
                                    onChange={(e) => handleNameChange('lastName', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="playerGender">Gender</label>
                                <select
                                    id="playerGender"
                                    name="playerGender"
                                    value={formData.playerGender}
                                    onChange={handleFormChange}
                                    required
                                >
                                    <option value="">-- Select Gender --</option>
                                    <option value="MALE">♂ Male</option>
                                    <option value="FEMALE">♀ Female</option>
                                    <option value="OTHER">⊙ Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="playerDateOfBirth">Date of Birth</label>
                                <input
                                    type="date"
                                    id="playerDateOfBirth"
                                    name="playerDateOfBirth"
                                    value={formData.playerDateOfBirth}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="playerNationality">Primary Nationality</label>
                                <select
                                    id="playerNationality"
                                    name="playerNationality"
                                    value={formData.playerNationality}
                                    onChange={handleFormChange}
                                    required
                                >
                                    <option value="">-- Select Country --</option>
                                    {countries.map(country => (
                                        <option key={country.code} value={country.name}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Place of Birth Section */}
                    <section className="form-section">
                        <h2>Place of Birth</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="suburb">Suburb</label>
                                <input
                                    id="suburb"
                                    placeholder="Suburb"
                                    value={formData.playerLocationOfBirth.suburb}
                                    onChange={(e) => handleLocationChange('suburb', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cityOrTown">City/Town</label>
                                <input
                                    id="cityOrTown"
                                    placeholder="City or Town"
                                    value={formData.playerLocationOfBirth.cityOrTown}
                                    onChange={(e) => handleLocationChange('cityOrTown', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="stateOrProvince">State/Province</label>
                                <input
                                    id="stateOrProvince"
                                    placeholder="State or Province"
                                    value={formData.playerLocationOfBirth.stateOrProvince}
                                    onChange={(e) => handleLocationChange('stateOrProvince', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <input
                                    id="country"
                                    placeholder="Country"
                                    value={formData.playerLocationOfBirth.country}
                                    onChange={(e) => handleLocationChange('country', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="continent">Continent</label>
                                <input
                                    id="continent"
                                    placeholder="Continent"
                                    value={formData.playerLocationOfBirth.continent}
                                    onChange={(e) => handleLocationChange('continent', e.target.value)}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Football Attributes Section */}
                    <section className="form-section">
                        <h2>Football Attributes</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="playerPosition">Position</label>
                                <select
                                    id="playerPosition"
                                    name="playerPosition"
                                    value={formData.playerPosition}
                                    onChange={handleFormChange}
                                    required
                                >
                                    <option value="">-- Select Position --</option>
                                    {PlayerPositions.map(pos => (
                                        <option key={pos} value={pos}>{pos}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="playerHeight">Height (cm)</label>
                                <input
                                    type="number"
                                    id="playerHeight"
                                    name="playerHeight"
                                    min="100"
                                    max="230"
                                    placeholder="185"
                                    value={formData.playerHeight}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="playerWeight">Weight (kg)</label>
                                <input
                                    type="number"
                                    id="playerWeight"
                                    name="playerWeight"
                                    min="40"
                                    max="130"
                                    placeholder="78"
                                    value={formData.playerWeight}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="kitNumber">Kit Number</label>
                                <input
                                    type="number"
                                    id="kitNumber"
                                    name="kitNumber"
                                    min="1"
                                    max="99"
                                    placeholder="10"
                                    value={formData.kitNumber}
                                    onChange={handleFormChange}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Club Registration Section */}
                    <section className="form-section">
                        <h2>Club Registration</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="club">Club</label>
                                <input
                                    id="club"
                                    name="club"
                                    placeholder="Current club"
                                    value={formData.club || ''}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="registrationStatus">Registration Status</label>
                                <select
                                    id="registrationStatus"
                                    value={registrationStatus}
                                    onChange={(e) => setRegistrationStatus(e.target.value)}
                                >
                                    <option value="active">Active</option>
                                    <option value="pending">Pending Transfer</option>
                                    <option value="on-loan">On Loan</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="nationalTeam">National Team</label>
                                <input
                                    id="nationalTeam"
                                    placeholder="National team"
                                    value={formData.nationalTeam || ''}
                                    onChange={handleFormChange}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Transfer Management Section */}
                    <section className="form-section">
                        <h2>Transfer Management</h2>
                        <div className="window-indicator open">
                            ⚠️ <strong>Summer Transfer Window:</strong> Open from June 1 - August 31, 2025 | <strong>Winter Window:</strong> January 1 - January 31, 2026
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="transferType">Transfer Type</label>
                                <select
                                    id="transferType"
                                    name="transferType"
                                    value={transferData.transferType}
                                    onChange={handleTransferChange}
                                >
                                    <option value="none">No Active Transfer</option>
                                    <option value="permanent">Permanent Transfer</option>
                                    <option value="loan">Loan</option>
                                    <option value="free">Free Transfer</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="transferFrom">From Club</label>
                                <input
                                    id="transferFrom"
                                    name="transferFrom"
                                    placeholder="Previous club"
                                    value={transferData.transferFrom}
                                    onChange={handleTransferChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="transferTo">To Club</label>
                                <input
                                    id="transferTo"
                                    name="transferTo"
                                    placeholder="Destination club"
                                    value={transferData.transferTo}
                                    onChange={handleTransferChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="transferFee">Transfer Fee (USD)</label>
                                <input
                                    type="number"
                                    id="transferFee"
                                    name="transferFee"
                                    min="0"
                                    placeholder="0"
                                    value={transferData.transferFee}
                                    onChange={handleTransferChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="transferDate">Transfer Date</label>
                                <input
                                    type="date"
                                    id="transferDate"
                                    name="transferDate"
                                    value={transferData.transferDate}
                                    onChange={handleTransferChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="transferWindow">Transfer Window</label>
                                <select
                                    id="transferWindow"
                                    name="transferWindow"
                                    value={transferData.transferWindow}
                                    onChange={handleTransferChange}
                                >
                                    <option value="summer-2025">Summer 2025</option>
                                    <option value="winter-2026">Winter 2026</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Loan Details Section */}
                    {transferData.transferType === 'loan' && (
                        <section className="form-section">
                            <h2>Loan Details</h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="loanClub">Loan Club</label>
                                    <input
                                        id="loanClub"
                                        name="loanClub"
                                        placeholder="Club loaned to"
                                        value={loanData.loanClub}
                                        onChange={handleLoanChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="loanStart">Loan Start Date</label>
                                    <input
                                        type="date"
                                        id="loanStart"
                                        name="loanStart"
                                        value={loanData.loanStart}
                                        onChange={handleLoanChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="loanEnd">Loan End Date</label>
                                    <input
                                        type="date"
                                        id="loanEnd"
                                        name="loanEnd"
                                        value={loanData.loanEnd}
                                        onChange={handleLoanChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="loanFee">Loan Fee (USD)</label>
                                    <input
                                        type="number"
                                        id="loanFee"
                                        name="loanFee"
                                        min="0"
                                        placeholder="0"
                                        value={loanData.loanFee}
                                        onChange={handleLoanChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="optionToBuy">Option to Buy (USD)</label>
                                    <input
                                        type="number"
                                        id="optionToBuy"
                                        name="optionToBuy"
                                        min="0"
                                        placeholder="0"
                                        value={loanData.optionToBuy}
                                        onChange={handleLoanChange}
                                    />
                                </div>
                            </div>
                        </section>
                    )}

                    <div className="form-actions">
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : (isEditMode ? 'Update Player' : 'Create Player')}
                        </button>
                        <button type="button" onClick={() => navigate('/players')}>
                            Cancel
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}