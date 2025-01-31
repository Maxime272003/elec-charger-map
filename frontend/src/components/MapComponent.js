import React from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ trajet }) => {
    const start = trajet ? trajet[0] : null;
    const end = trajet ? trajet[trajet.length - 1] : null;

    return (
        <div>
            <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {trajet && <Polyline positions={trajet} color="blue" />}
                {start && (
                    <Marker position={start}>
                        <Popup>Départ</Popup>
                    </Marker>
                )}
                {end && (
                    <Marker position={end}>
                        <Popup>Arrivée</Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default MapComponent;