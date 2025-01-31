import React, { useState } from 'react';
import VehicleList from './components/VehicleList';
import NearestStationForm from './components/NearestStationForm';
import TrajetForm from './components/TrajetForm';
import MapComponent from './components/MapComponent';

const App = () => {
    const [trajet, setTrajet] = useState(null);

    const handleTrajet = (start, end) => {
        fetch(`http://localhost:5000/trajet?start=${start}&end=${end}`)
            .then(response => response.json())
            .then(data => {
                if (data.features && data.features.length > 0) {
                    const coordinates = data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                    setTrajet(coordinates);
                } else {
                    console.error('No features found in the response');
                }
            })
            .catch(error => {
                console.error('Error fetching trajet:', error);
            });
    };

    return (
        <div>
            <VehicleList />
            <NearestStationForm />
            <TrajetForm handleTrajet={handleTrajet} />
            <MapComponent trajet={trajet} />
        </div>
    );
};

export default App;