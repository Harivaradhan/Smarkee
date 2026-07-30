import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './SmartBinMap.css';
import bins from './bins.json';

// Use an inline SVG data URL for a custom bin marker — avoids asset imports.
const iconSvg = encodeURIComponent(`<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 24 24" fill="none"><path d="M12 2C8 2 5 5 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-4-3-7-7-7z" fill="#2E7D32"/><circle cx="12" cy="9" r="2.5" fill="#fff"/></svg>`);

const binIcon = new L.Icon({
  iconUrl: `data:image/svg+xml;charset=utf-8,${iconSvg}`,
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -36],
});

export default function SmartBinMap({ height = 360 }) {
  const center = bins && bins.length ? [bins[0].lat, bins[0].lng] : [8.5241, 76.9366];

  return (
    <div className="smartbin-map" style={{ height }}>
      <MapContainer center={center} zoom={13} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {bins.map((b) => (
          <Marker key={b.id} position={[b.lat, b.lng]} icon={binIcon}>
            <Popup>
              <div>
                <strong>{b.name}</strong>
                <div style={{ fontStyle: 'italic', marginBottom: 6 }}>{b.location}</div>
                <div>Status: {b.status}</div>
                <div>Fill Level: {b.fillLevel}</div>
                <div>Bottles Collected: {b.bottlesCollected}</div>
                <div>Last Emptied: {b.lastEmptied}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
