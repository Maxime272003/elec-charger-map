import React, { useState } from 'react';

const TrajetForm = () => {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [trajet, setTrajet] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/trajet?start=${start}&end=${end}`)
            .then(response => response.json())
            .then(data => setTrajet(data));
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
            {trajet && (
                <div>
                    <h3>Trajet trouvé:</h3>
                    <pre>{JSON.stringify(trajet, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default TrajetForm;