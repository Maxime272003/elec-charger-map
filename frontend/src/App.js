import React from 'react';
import VehicleList from './components/VehicleList';
import NearestStationForm from './components/NearestStationForm';
import TrajetForm from './components/TrajetForm';

const App = () => {
    return (
        <div>
            <VehicleList />
            <NearestStationForm />
            <TrajetForm />
        </div>
    );
};

export default App;