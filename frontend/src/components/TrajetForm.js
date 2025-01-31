import React, { useState } from 'react';

const TrajetForm = ({ handleTrajet }) => {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const geocodeLocation = async (location) => {
        const response = await fetch(`http://localhost:5000/geocode?location=${location}`);
        const data = await response.json();
        if (response.ok) {
            return `${data.lon},${data.lat}`;
        } else {
            throw new Error(data.error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const startCoords = await geocodeLocation(start);
            const endCoords = await geocodeLocation(end);
            handleTrajet(startCoords, endCoords);
        } catch (error) {
            console.error('Error geocoding location:', error);
        }
    };

    return (
        <div>
            <h2>Trajet</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Départ:
                    <input type="text" value={start} onChange={(e) => setStart(e.target.value)} required />
                </label>
                <label>
                    Arrivée:
                    <input type="text" value={end} onChange={(e) => setEnd(e.target.value)} required />
                </label>
                <button type="submit">Obtenir le trajet</button>
            </form>
        </div>
    );
};

export default TrajetForm;