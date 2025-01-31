import React, { useState } from 'react';

const NearestStationForm = () => {
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [station, setStation] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/nearest_station?lat=${lat}&lon=${lon}`)
            .then(response => response.json())
            .then(data => setStation(data));
    };

    return (
        <div>
            <h2>Station de recharge la plus proche</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Latitude:
                    <input type="text" value={lat} onChange={(e) => setLat(e.target.value)} required />
                </label>
                <label>
                    Longitude:
                    <input type="text" value={lon} onChange={(e) => setLon(e.target.value)} required />
                </label>
                <button type="submit">Rechercher</button>
            </form>
            {station && (
                <div>
                    <h3>Station trouvée:</h3>
                    <p>{station.name}</p>
                </div>
            )}
        </div>
    );
};

export default NearestStationForm;