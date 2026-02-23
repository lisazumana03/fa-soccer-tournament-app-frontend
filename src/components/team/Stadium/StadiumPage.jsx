import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

const defaultPosition = { lat: -26.2348, lng: 27.9822 }; // FNB Stadium as default

function LocationMarker({ position, setPosition }) {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });
    return position ? <Marker position={position} /> : null;
}

export default function StadiumPage() {
    const [form, setForm] = useState({
        name: "",
        type: "Stadium",
        country: "",
        city: "",
        capacity: "",
        surface: "",
        tenants: "",
        latitude: defaultPosition.lat,
        longitude: defaultPosition.lng,
        address: "",
        postalCode: "",
        notes: "",
    });
    const [markerPos, setMarkerPos] = useState(defaultPosition);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleMapClick = (latlng) => {
        setMarkerPos(latlng);
        setForm((prev) => ({ ...prev, latitude: latlng.lat, longitude: latlng.lng }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Replace with API call
        alert("Stadium created!\n" + JSON.stringify(form, null, 2));
        setForm({
            name: "",
            type: "Stadium",
            country: "",
            city: "",
            capacity: "",
            surface: "",
            tenants: "",
            latitude: defaultPosition.lat,
            longitude: defaultPosition.lng,
            address: "",
            postalCode: "",
            notes: "",
        });
        setMarkerPos(defaultPosition);
    };

    return (
        <div style={pageStyle}>
            <header style={headerStyle}>
                <h1 style={headerTitleStyle}>Create Stadium</h1>
            </header>
            <main style={{ maxWidth: 1200, margin: "30px auto", padding: "0 20px 40px 20px" }}>
                <form onSubmit={handleSubmit} style={formStyle}>
                    <div style={gridStyle}>
                        <div>
                            <label style={labelStyle} htmlFor="name">Stadium Name</label>
                            <input style={inputStyle} id="name" name="name" value={form.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <label style={labelStyle} htmlFor="type">Type</label>
                            <select style={inputStyle} id="type" name="type" value={form.type} onChange={handleChange}>
                                <option value="Stadium">Stadium</option>
                                <option value="Arena">Arena</option>
                                <option value="Field">Field</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle} htmlFor="country">Country</label>
                            <input style={inputStyle} id="country" name="country" value={form.country} onChange={handleChange} required />
                        </div>
                        <div>
                            <label style={labelStyle} htmlFor="city">City</label>
                            <input style={inputStyle} id="city" name="city" value={form.city} onChange={handleChange} />
                        </div>
                        <div>
                            <label style={labelStyle} htmlFor="capacity">Capacity</label>
                            <input style={inputStyle} id="capacity" name="capacity" type="number" value={form.capacity} onChange={handleChange} />
                        </div>
                        <div>
                            <label style={labelStyle} htmlFor="surface">Surface</label>
                            <input style={inputStyle} id="surface" name="surface" value={form.surface} onChange={handleChange} />
                        </div>
                        <div>
                            <label style={labelStyle} htmlFor="tenants">Tenants</label>
                            <input style={inputStyle} id="tenants" name="tenants" value={form.tenants} onChange={handleChange} />
                        </div>
                    </div>

                    <div style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>Location</h2>
                        <div style={gridStyle}>
                            <div>
                                <label style={labelStyle} htmlFor="latitude">Latitude</label>
                                <input style={inputStyle} id="latitude" name="latitude" value={form.latitude} onChange={handleChange} readOnly />
                            </div>
                            <div>
                                <label style={labelStyle} htmlFor="longitude">Longitude</label>
                                <input style={inputStyle} id="longitude" name="longitude" value={form.longitude} onChange={handleChange} readOnly />
                            </div>
                            <div>
                                <label style={labelStyle} htmlFor="address">Address</label>
                                <input style={inputStyle} id="address" name="address" value={form.address} onChange={handleChange} />
                            </div>
                            <div>
                                <label style={labelStyle} htmlFor="postalCode">Postal Code</label>
                                <input style={inputStyle} id="postalCode" name="postalCode" value={form.postalCode} onChange={handleChange} />
                            </div>
                        </div>
                        <div style={{ marginTop: 20, height: 350, borderRadius: 10, border: "2px dashed rgba(0, 212, 255, 0.3)", overflow: "hidden" }}>
                            <MapContainer
                                center={[markerPos.lat, markerPos.lng]}
                                zoom={15}
                                style={{ height: "100%", width: "100%" }}
                                whenCreated={(map) => {
                                    map.on("click", (e) => handleMapClick(e.latlng));
                                }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[markerPos.lat, markerPos.lng]} />
                            </MapContainer>
                            <div style={{ color: "#00d4ff", fontSize: 13, marginTop: 8, textAlign: "center" }}>
                                Click on the map to set stadium location
                            </div>
                        </div>
                    </div>

                    <div style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>Notes</h2>
                        <textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} id="notes" name="notes" value={form.notes} onChange={handleChange} />
                    </div>

                    <button type="submit" style={buttonStyle}>Save Stadium</button>
                </form>
            </main>
            <footer style={footerStyle}>
                © 1994/95–{new Date().getFullYear()} GoalGrid
            </footer>
        </div>
    );
}

const pageStyle = {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(135deg, #0a1628 0%, #1a2332 50%, #0f1923 100%)",
    color: "#fff",
    minHeight: "100vh",
};
const headerStyle = {
    background: "linear-gradient(90deg, #00d4ff 0%, #0099ff 100%)",
    padding: 20,
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0, 212, 255, 0.3)",
};
const headerTitleStyle = {
    fontSize: 28,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 2,
};
const formStyle = {
    background: "linear-gradient(145deg, rgba(26, 35, 50, 0.9) 0%, rgba(15, 25, 35, 0.9) 100%)",
    borderRadius: 20,
    border: "2px solid rgba(0, 212, 255, 0.2)",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
    padding: 30,
};
const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 14,
};
const labelStyle = {
    display: "block",
    fontWeight: 600,
    marginBottom: 8,
    color: "#00d4ff",
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 0.5,
};
const inputStyle = {
    width: "100%",
    padding: "12px 15px",
    background: "rgba(0, 0, 0, 0.4)",
    border: "2px solid rgba(0, 212, 255, 0.3)",
    borderRadius: 10,
    color: "#fff",
    fontSize: 14,
    boxSizing: "border-box",
    transition: "all 0.3s",
};
const sectionStyle = {
    marginTop: 20,
    padding: 20,
    background: "rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(0, 212, 255, 0.2)",
    borderRadius: 15,
};
const sectionTitleStyle = {
    marginTop: 0,
    color: "#00d4ff",
    fontSize: 18,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 15,
};
const buttonStyle = {
    marginTop: 25,
    padding: "15px 40px",
    background: "linear-gradient(90deg, #00d4ff 0%, #0099ff 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 30,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
    boxShadow: "0 5px 20px rgba(0, 212, 255, 0.4)",
    transition: "all 0.3s",
};
const footerStyle = {
    textAlign: "center",
    padding: "24px 16px",
    marginTop: 40,
    color: "rgba(255,255,255,0.65)",
    fontSize: 13,
    borderTop: "1px solid rgba(255,255,255,0.14)",
};