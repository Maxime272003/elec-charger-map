import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ trajet }) => {
    useEffect(() => {
        const map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        if (trajet) {
            const polyline = L.polyline(trajet, { color: 'blue' }).addTo(map);
            map.fitBounds(polyline.getBounds());
        }

        return () => {
            map.remove();
        };
    }, [trajet]);

    return <div id="map" className="leaflet-container"></div>;
};

export default MapComponent;