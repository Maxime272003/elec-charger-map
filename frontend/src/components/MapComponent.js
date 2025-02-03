import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ trajet, chargingStations }) => {
    useEffect(() => {
        const map = L.map('map').setView([48.8566, 2.3522], 6);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        if (trajet) {
            const polyline = L.polyline(trajet, { color: 'blue' }).addTo(map);
            map.fitBounds(polyline.getBounds());
        }

        if (chargingStations.length > 0) {
            chargingStations.forEach(station => {
                console.log(station);
                L.marker([station.ylatitude, station.xlongitude])
                    .addTo(map)
                    .bindPopup(`<b>${station.n_station}</b><br>${station.ad_station}`);
            });
        }

        return () => {
            map.remove();
        };
    }, [trajet, chargingStations]);

    return <div id="map" className="leaflet-container"></div>;
};

export default MapComponent;