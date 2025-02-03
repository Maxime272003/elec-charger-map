import React, { useEffect, useState } from 'react';

const VehicleList = ({ setSelectedVehicle, selectedVehicle }) => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/vehicles')
            .then(response => response.json())
            .then(data => setVehicles(data));
    }, []);

    const handleSelect = (e) => {
        const vehicle = vehicles.find(v => v.id === e.target.value);
        setSelectedVehicle(vehicle);
    };

    return (
        <div className="vehicle-list">
            <h2>Liste des véhicules</h2>
            <select onChange={handleSelect}>
                <option value="">--Sélectionnez un véhicule--</option>
                {vehicles.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.naming.make} {vehicle.naming.model}
                    </option>
                ))}
            </select>
            {selectedVehicle && (
                <div className="vehicle-details">
                    <h3>{selectedVehicle.naming.make} {selectedVehicle.naming.model}</h3>
                    <img src={selectedVehicle.media.image.thumbnail_url} alt={`${selectedVehicle.naming.make} ${selectedVehicle.naming.model}`} />
                    <p>Version: {selectedVehicle.naming.chargetrip_version}</p>
                    <p>Autonomie: {selectedVehicle.range.chargetrip_range.best} - {selectedVehicle.range.chargetrip_range.worst} km</p>
                    <p>Batterie: {selectedVehicle.battery.usable_kwh} kWh</p>
                </div>
            )}
        </div>
    );
};

export default VehicleList;