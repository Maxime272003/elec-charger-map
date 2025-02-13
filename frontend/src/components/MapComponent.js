import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ trajet, chargingStations }) => {
    const mapRef = useRef(null);

    useEffect(() => {

        if (!mapRef.current) {
            mapRef.current = L.map('map').setView([48.8566, 2.3522], 6);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapRef.current);
        }

        const map = mapRef.current;

        const customIconGreen = L.icon({
            iconUrl: '/images/marker_green.png',
            iconSize: [38, 38], 
            iconAnchor: [19, 38], 
            popupAnchor: [0, -38] 
        });

        const customIconRed = L.icon({
            iconUrl: '/images/marker_red.png',
            iconSize: [38, 38], 
            iconAnchor: [19, 38], 
            popupAnchor: [0, -38] 
        });

        if (trajet) {
            const polyline = L.polyline(trajet, { color: 'blue' }).addTo(map);
            map.fitBounds(polyline.getBounds());

            L.marker(trajet[0], { icon: customIconRed })
                .addTo(map)
                .bindPopup('Départ');

            L.marker(trajet[trajet.length - 1], { icon: customIconRed })
                .addTo(map)
                .bindPopup('Arrivée');
        }

        if (chargingStations.length > 0) {
            chargingStations.forEach(station => {
                L.marker([station.ylatitude, station.xlongitude], { icon: customIconGreen })
                    .addTo(map)
                    .bindPopup(`<b>${station.n_station}</b><br>${station.ad_station}`);
            });
        }

        return () => {
            map.eachLayer(layer => {
                if (layer instanceof L.Marker || layer instanceof L.Polyline) {
                    map.removeLayer(layer);
                }
            });
        };
    }, [trajet, chargingStations]);

    return <div id="map" className="leaflet-container"></div>;
};

export default MapComponent;