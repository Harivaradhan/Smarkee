import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './SmartBinMap.css';
import bins from './bins.json';

// Use an inline SVG data URL for a custom bin marker — avoids asset imports.
const statusColorMap = {
  Active: '#2E7D32',
  Maintenance: '#F57C00',
  Offline: '#D32F2F',
};

const getBinIcon = (status) => {
  const fillColor = statusColorMap[status] || '#2E7D32';
  const iconSvg = encodeURIComponent(`<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 24 24" fill="none"><path d="M12 2C8 2 5 5 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-4-3-7-7-7z" fill="${fillColor}"/><circle cx="12" cy="9" r="2.5" fill="#fff"/></svg>`);

  return new L.Icon({
    iconUrl: `data:image/svg+xml;charset=utf-8,${iconSvg}`,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -36],
  });
};

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
          <Marker key={b.id} position={[b.lat, b.lng]} icon={getBinIcon(b.status)}>
            <Popup>
              <div>
                <div><strong>Bin ID:</strong> {b.id}</div>
                <div><strong>Location:</strong> {b.location}</div>
                <div><strong>City:</strong> {b.city || '—'}</div>
                <div><strong>Fill Percentage:</strong> {b.fill || b.fillLevel || '—'}</div>
                <div><strong>Status:</strong> {b.status}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
