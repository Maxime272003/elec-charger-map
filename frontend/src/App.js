import React, { useState } from 'react';
import VehicleList from './components/VehicleList';
import TrajetForm from './components/TrajetForm';
import MapComponent from './components/MapComponent';

const App = () => {
    const [trajet, setTrajet] = useState(null);
    const [chargingStations, setChargingStations] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [error, setError] = useState(null);
    const [trajetTime, setTrajetTime] = useState(null);

    const handleTrajet = (start, end, autonomie) => {
        fetch(`https://elecmapapi.azurewebsites.net/trajet?start=${start}&end=${end}`)
            .then(response => response.json())
            .then(data => {
                if (data.features && data.features.length > 0) {
                    const coordinates = data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                    setTrajet(coordinates);

                    const pointsIntermediaires = [];
                    let distanceParcourue = 0;
                    let totalDistance = 0;
                    for (let i = 1; i < coordinates.length; i++) {
                        const [lat1, lon1] = coordinates[i - 1];
                        const [lat2, lon2] = coordinates[i];
                        const distance = calculateDistance(lat1, lon1, lat2, lon2);
                        distanceParcourue += distance;
                        totalDistance += distance;
                        if (distanceParcourue >= autonomie) {
                            pointsIntermediaires.push(coordinates[i]);
                            distanceParcourue = 0;
                        }
                    }

                    const fetchChargingStations = pointsIntermediaires.map(([lat, lon]) =>
                        fetch(`https://elecmapapi.azurewebsites.net/nearest_station?lat=${lat}&lon=${lon}`)
                            .then(response => response.json())
                    );

                    Promise.all(fetchChargingStations)
                        .then(stations => {
                            setChargingStations(stations);
                        })
                        .catch(error => {
                            console.error('Error fetching charging stations:', error);
                            setError('Erreur lors de la récupération des bornes de recharge.');
                        });

                    fetch(`http://localhost:5000/calculer_temps_trajet?distance=${totalDistance}&autonomie=${autonomie}&nb_recharges=${pointsIntermediaires.length}`)
                        .then(response => response.json())
                        .then(data => {
                            setTrajetTime(data);
                        })
                        .catch(error => {
                            console.error('Error calculating trajet time:', error);
                            setError('Erreur lors du calcul du temps de trajet.');
                        });
                } else {
                    console.error('No features found in the response');
                    setError('Aucune donnée de trajet trouvée.');
                }
            })
            .catch(error => {
                console.error('Error fetching trajet:', error);
                setError('Erreur lors de la récupération du trajet.');
            });
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon1 - lon2) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    return (
        <div>
            <div className="sidebar">
                {error && <div className="error">{error}</div>}
                <VehicleList setSelectedVehicle={setSelectedVehicle} selectedVehicle={selectedVehicle} />
                <div className="trajet-time">
                    <h2>Détails</h2>
                    <p>Temps : {trajetTime ? `${trajetTime.time} minutes` : '0h00'}</p>
                    <p>Prix : {trajetTime ? `${trajetTime.price} euros` : '0'}</p>
                </div>
                <div className="trajet-form-container">
                    <TrajetForm handleTrajet={handleTrajet} selectedVehicle={selectedVehicle} />
                </div>
            </div>
            <MapComponent trajet={trajet} chargingStations={chargingStations} />
        </div>
    );
};

export default App;