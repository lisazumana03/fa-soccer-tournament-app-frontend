import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// Example stadium data (replace with API call or props as needed)
const stadiumData = {
    id: "fnb-stadium",
    name: "FNB Stadium",
    location: "Johannesburg, South Africa",
    capacity: 94736,
    built: 1989,
    surface: "Grass",
    tenants: ["Kaizer Chiefs", "South Africa National Team"],
    coordinates: { lat: -26.2348, lng: 27.9822 },
    events: [
        { type: "League", name: "PSL Matchday 12", date: "2026-03-10" },
        { type: "International Friendly", name: "SA vs. Nigeria", date: "2026-04-02" },
    ],
    stats: {
        matches: 120,
        goals: 340,
        avgAttendance: 65000,
        cleanSheets: 40,
    },
    notableMatches: [
        { date: "2010-07-11", event: "World Cup Final", teams: "Netherlands vs Spain", score: "0-1" },
        { date: "1996-02-03", event: "AFCON Final", teams: "South Africa vs Tunisia", score: "2-0" },
    ],
};

export default function StadiumDetails() {
    const [showMap, setShowMap] = useState(false);

    const handleMapView = () => {
        setShowMap((prev) => !prev);
    };

    return (
        <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", background: "linear-gradient(135deg, #0a1628 0%, #1a2332 50%, #0f1923 100%)", color: "#fff", minHeight: "100vh" }}>
            <header style={{ background: "linear-gradient(90deg, #00d4ff 0%, #0099ff 100%)", padding: 20, boxShadow: "0 4px 20px rgba(0, 212, 255, 0.3)" }}>
                <h1 style={{ fontSize: 28, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2 }}>{stadiumData.name} Details</h1>
                <div style={{ marginTop: 10, fontSize: 13, opacity: 0.9 }}>
                    <a href="/venues" style={{ color: "#fff", textDecoration: "none" }}>Venues</a> / <a href="/venues/list" style={{ color: "#fff", textDecoration: "none" }}>All Venues</a> / <span>{stadiumData.name}</span>
                </div>
            </header>

            <main style={{ maxWidth: 1400, margin: "30px auto", padding: "0 20px 40px 20px" }}>
                {/* Stadium Overview */}
                <div style={{ background: "linear-gradient(145deg, rgba(26, 35, 50, 0.9) 0%, rgba(15, 25, 35, 0.9) 100%)", borderRadius: 20, border: "2px solid rgba(0, 212, 255, 0.2)", boxShadow: "0 10px 40px rgba(0,0,0,0.5)", padding: 30, marginBottom: 30 }}>
                    <div style={{ fontSize: 32, fontWeight: 700, color: "#00d4ff", marginBottom: 15 }}>{stadiumData.name}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginTop: 20 }}>
                        <div className="meta-item">
                            <div className="meta-label">Location</div>
                            <div className="meta-value">{stadiumData.location}</div>
                        </div>
                        <div className="meta-item">
                            <div className="meta-label">Capacity</div>
                            <div className="meta-value">{stadiumData.capacity.toLocaleString()}</div>
                        </div>
                        <div className="meta-item">
                            <div className="meta-label">Built</div>
                            <div className="meta-value">{stadiumData.built}</div>
                        </div>
                        <div className="meta-item">
                            <div className="meta-label">Surface</div>
                            <div className="meta-value">{stadiumData.surface}</div>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: 15, marginTop: 20 }}>
                        <button onClick={() => alert("Opening stadium editor...")} style={buttonStyle}>Edit Stadium</button>
                        <button onClick={handleMapView} style={{ ...buttonStyle, background: showMap ? "#0099ff" : "linear-gradient(90deg, #00d4ff 0%, #0099ff 100%)" }} className="secondary">{showMap ? "Hide Map" : "View on Map"}</button>
                        <button onClick={() => alert("Opening match scheduler...")} style={{ ...buttonStyle, background: "linear-gradient(90deg, rgba(100, 100, 100, 0.3) 0%, rgba(80, 80, 80, 0.3) 100%)" }} className="secondary">Schedule Match</button>
                    </div>
                    {showMap && (
                        <div style={{ marginTop: 30, height: 300, borderRadius: 10, overflow: "hidden", border: "2px dashed rgba(0, 212, 255, 0.3)" }}>
                            <MapContainer center={[stadiumData.coordinates.lat, stadiumData.coordinates.lng]} zoom={15} style={{ height: "100%", width: "100%" }}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[stadiumData.coordinates.lat, stadiumData.coordinates.lng]}>
                                    <Popup>
                                        {stadiumData.name} <br /> {stadiumData.location}
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    )}
                </div>

                {/* Stadium Information */}
                <div style={{ background: "linear-gradient(145deg, rgba(26, 35, 50, 0.9) 0%, rgba(15, 25, 35, 0.9) 100%)", borderRadius: 20, border: "2px solid rgba(0, 212, 255, 0.2)", boxShadow: "0 10px 40px rgba(0,0,0,0.5)", padding: 30, marginBottom: 30 }}>
                    <h2 style={sectionTitleStyle}>Stadium Information</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 15 }}>
                        <div className="info-item"><label>Name</label><span>{stadiumData.name}</span></div>
                        <div className="info-item"><label>Location</label><span>{stadiumData.location}</span></div>
                        <div className="info-item"><label>Capacity</label><span>{stadiumData.capacity.toLocaleString()}</span></div>
                        <div className="info-item"><label>Built</label><span>{stadiumData.built}</span></div>
                        <div className="info-item"><label>Surface</label><span>{stadiumData.surface}</span></div>
                        <div className="info-item"><label>Tenants</label><span>{stadiumData.tenants.join(", ")}</span></div>
                    </div>
                    <div style={{ marginTop: 30 }}>
                        <label style={{ color: "#00d4ff", fontWeight: 600, marginBottom: 10, display: "block" }}>Home Tenants</label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
                            {stadiumData.tenants.map((tenant) => (
                                <span key={tenant} style={{ background: "rgba(0, 212, 255, 0.1)", border: "1px solid rgba(0, 212, 255, 0.3)", padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>{tenant}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Match Statistics */}
                <div style={{ background: "linear-gradient(145deg, rgba(26, 35, 50, 0.9) 0%, rgba(15, 25, 35, 0.9) 100%)", borderRadius: 20, border: "2px solid rgba(0, 212, 255, 0.2)", boxShadow: "0 10px 40px rgba(0,0,0,0.5)", padding: 30, marginBottom: 30 }}>
                    <h2 style={sectionTitleStyle}>Match Statistics</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 15, marginTop: 20 }}>
                        <div className="stat-card">
                            <div className="stat-number">{stadiumData.stats.matches}</div>
                            <div className="stat-label">Total Matches</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">{stadiumData.stats.goals}</div>
                            <div className="stat-label">Total Goals</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">{stadiumData.stats.avgAttendance.toLocaleString()}</div>
                            <div className="stat-label">Avg Attendance</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">{stadiumData.stats.cleanSheets}</div>
                            <div className="stat-label">Clean Sheets</div>
                        </div>
                    </div>
                </div>

                {/* Notable Historical Matches */}
                <div style={{ background: "linear-gradient(145deg, rgba(26, 35, 50, 0.9) 0%, rgba(15, 25, 35, 0.9) 100%)", borderRadius: 20, border: "2px solid rgba(0, 212, 255, 0.2)", boxShadow: "0 10px 40px rgba(0,0,0,0.5)", padding: 30, marginBottom: 30 }}>
                    <h2 style={sectionTitleStyle}>Notable Historical Matches</h2>
                    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Date</th>
                                <th style={thStyle}>Event</th>
                                <th style={thStyle}>Teams</th>
                                <th style={thStyle}>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stadiumData.notableMatches.map((match, idx) => (
                                <tr key={idx} style={{ transition: "all 0.3s" }}>
                                    <td style={tdStyle}>{match.date}</td>
                                    <td style={tdStyle}>{match.event}</td>
                                    <td style={tdStyle}>{match.teams}</td>
                                    <td style={tdStyle}>{match.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <footer style={{ textAlign: "center", padding: "24px 16px", marginTop: 40, color: "rgba(255,255,255,0.65)", fontSize: 13, borderTop: "1px solid rgba(255,255,255,0.14)" }}>
                    © 1994/95–{new Date().getFullYear()} GoalGrid
                </footer>
            </main>
        </div>
    );
}

const buttonStyle = {
    padding: "12px 30px",
    background: "linear-gradient(90deg, #00d4ff 0%, #0099ff 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 25,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
    boxShadow: "0 5px 20px rgba(0, 212, 255, 0.4)",
    transition: "all 0.3s",
    marginRight: 0,
};

const sectionTitleStyle = {
    fontSize: 22,
    fontWeight: 700,
    color: "#00d4ff",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 20,
    paddingBottom: 15,
    borderBottom: "2px solid rgba(0, 212, 255, 0.2)",
};

const thStyle = {
    background: "linear-gradient(90deg, rgba(0, 212, 255, 0.2) 0%, rgba(0, 153, 255, 0.2) 100%)",
    fontWeight: 700,
    textTransform: "uppercase",
    fontSize: 11,
    letterSpacing: 1,
    color: "#00d4ff",
    padding: 15,
    borderBottom: "1px solid rgba(255,255,255,0.1)",
};

const tdStyle = {
    padding: 15,
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
};