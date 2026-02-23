
import { useState } from 'react';
import '../../team/Team/TeamPage.css';

export default function TeamPage() {
    const [form, setForm] = useState({
        teamName: '',
        teamInitials: '',
        teamType: '',
        variant: '',
        country: '',
        association: '',
        clubLink: '',
        foundationYear: '',
        homeVenue: '',
        stadiumOwnership: '',
        secondaryStadium: '',
        primaryKit: '',
        secondaryKit: '',
        goalkeeperKit: '',
        inheritance: '',
        squadMin: '',
        squadMax: '',
        reserveTeam: '',
        youthLink: '',
        owner: '',
        logo: null,
        logoPreview: '',
    });
    const [logoPreview, setLogoPreview] = useState('');

    // Handle input changes
    const handleChange = e => {
        const { name, value, type } = e.target;
        setForm(f => ({
            ...f,
            [name]: type === 'file' ? e.target.files[0] : value
        }));
        if (type === 'file' && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = ev => setLogoPreview(ev.target.result);
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleClearLogo = () => {
        setForm(f => ({ ...f, logo: null }));
        setLogoPreview('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        // TODO: Submit form to backend
        alert('Team saved!');
    };

    // Example country list (replace with real data or fetch)
    const countries = [
        { name: 'South Africa', flag: '🇿🇦' },
        { name: 'Nigeria', flag: '🇳🇬' },
        { name: 'England', flag: '🇬🇧' },
        { name: 'Brazil', flag: '🇧🇷' },
        // ...
    ];

    return (
        <div>
            <header>
                <h1>Add a Team</h1>
            </header>
            <main>
                <form onSubmit={handleSubmit}>
                    <div className="section">
                        <div className="grid">
                            <div>
                                <label htmlFor="teamName">Team Name</label>
                                <input name="teamName" id="teamName" value={form.teamName} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="teamInitials">Initials</label>
                                <input name="teamInitials" id="teamInitials" value={form.teamInitials} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="teamType">Team Type</label>
                                <select name="teamType" id="teamType" value={form.teamType} onChange={handleChange} required>
                                    <option value="">Select...</option>
                                    <option value="club">Club</option>
                                    <option value="national">National</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="variant">Variant</label>
                                <select name="variant" id="variant" value={form.variant} onChange={handleChange}>
                                    <option value="">Select...</option>
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                    <option value="youth">Youth</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="country">Country</label>
                                <select name="country" id="country" value={form.country} onChange={handleChange}>
                                    <option value="">Select...</option>
                                    {countries.map(c => (
                                        <option key={c.name} value={c.name}>{c.flag} {c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="association">Association</label>
                                <input name="association" id="association" value={form.association} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="clubLink">Club Link</label>
                                <input name="clubLink" id="clubLink" value={form.clubLink} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="foundationYear">Foundation Year</label>
                                <input name="foundationYear" id="foundationYear" value={form.foundationYear} onChange={handleChange} type="number" />
                            </div>
                            <div>
                                <label htmlFor="homeVenue">Home Venue</label>
                                <input name="homeVenue" id="homeVenue" value={form.homeVenue} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="stadiumOwnership">Stadium Ownership</label>
                                <input name="stadiumOwnership" id="stadiumOwnership" value={form.stadiumOwnership} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="secondaryStadium">Secondary Stadium</label>
                                <input name="secondaryStadium" id="secondaryStadium" value={form.secondaryStadium} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="section">
                        <h2>Branding & Kits</h2>
                        <div className="grid">
                            <div>
                                <label htmlFor="primaryKit">Primary Kit</label>
                                <input name="primaryKit" id="primaryKit" value={form.primaryKit} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="secondaryKit">Secondary Kit</label>
                                <input name="secondaryKit" id="secondaryKit" value={form.secondaryKit} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="goalkeeperKit">Goalkeeper Kit</label>
                                <input name="goalkeeperKit" id="goalkeeperKit" value={form.goalkeeperKit} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="inheritance">Inheritance</label>
                                <input name="inheritance" id="inheritance" value={form.inheritance} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="logo-upload-section">
                        <h2>🏟️ Team Logo Upload</h2>
                        <div className="logo-upload-container">
                            <div className="upload-input-wrapper">
                                <label htmlFor="teamLogo">Upload Logo</label>
                                <input name="logo" id="teamLogo" type="file" accept="image/*" onChange={handleChange} />
                                <div className="logo-size-info">Recommended: 1024 x 768px</div>
                            </div>
                            <div className={`logo-preview-section${logoPreview ? ' active' : ''}`}>
                                <div className="preview-label">Logo Preview</div>
                                {logoPreview ? (
                                    <img src={logoPreview} alt="Logo Preview" className="shown" style={{ maxWidth: '100%', maxHeight: 220, borderRadius: 10 }} />
                                ) : (
                                    <div className="placeholder-text">No logo selected</div>
                                )}
                                {logoPreview && (
                                    <button type="button" className="logo-clear-btn shown" onClick={handleClearLogo}>Clear Logo</button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="section">
                        <div className="grid">
                            <div>
                                <label htmlFor="squadMin">Squad Min</label>
                                <input name="squadMin" id="squadMin" value={form.squadMin} onChange={handleChange} type="number" />
                            </div>
                            <div>
                                <label htmlFor="squadMax">Squad Max</label>
                                <input name="squadMax" id="squadMax" value={form.squadMax} onChange={handleChange} type="number" />
                            </div>
                            <div>
                                <label htmlFor="reserveTeam">Reserve Team</label>
                                <input name="reserveTeam" id="reserveTeam" value={form.reserveTeam} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="youthLink">Youth Link</label>
                                <input name="youthLink" id="youthLink" value={form.youthLink} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="section">
                        <h2>Ownership</h2>
                        <div className="grid">
                            <div>
                                <label htmlFor="owner">Owner</label>
                                <input name="owner" id="owner" value={form.owner} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <button type="submit">Save Team</button>
                </form>
            </main>
            <footer className="app-footer">
                © 1994/95–{new Date().getFullYear()} GoalGrid
            </footer>
        </div>
    );
}