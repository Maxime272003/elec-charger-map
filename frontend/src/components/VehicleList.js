import React, { useEffect, useState } from 'react';

const VehicleList = ({ setSelectedVehicle, selectedVehicle }) => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetch('https://elecmapapi.azurewebsites.net/vehicles')
            .then(response => response.json())
            .then(data => setVehicles(data || [])) 
            .catch(error => {
                console.error('Error fetching vehicles:', error);
                setVehicles([]); 
            });
    }, []);

    const handleSelect = (e) => {
        const vehicle = vehicles.find(v => v.id === e.target.value);
        setSelectedVehicle(vehicle);
    };

    return (
        <div className="vehicle-list">
            <select onChange={handleSelect}>
                <option value="">--Sélectionnez un véhicule--</option>
                {Array.isArray(vehicles) && vehicles.length > 0 ? (
                    vehicles.map(vehicle => (
                        <option key={vehicle.id} value={vehicle.id}>
                            {vehicle.naming.make} {vehicle.naming.model}
                        </option>
                    ))
                ) : (
                    <option disabled>Chargement des véhicules...</option>
                )}
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