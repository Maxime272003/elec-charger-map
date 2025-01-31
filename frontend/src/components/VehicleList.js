import React, { useEffect, useState } from 'react';

const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/vehicles')
            .then(response => response.json())
            .then(data => setVehicles(data));
    }, []);

    return (
        <div>
            <h2>Liste des véhicules</h2>
            <select>
                <option value="">--Sélectionnez un véhicule--</option>
                {vehicles.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.naming.make} {vehicle.naming.model}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default VehicleList;