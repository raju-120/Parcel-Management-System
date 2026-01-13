import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';



const CoverageMap = () => {
  // Center of Bangladesh (Dhaka)
  const centerPosition = [23.8103, 90.4125];

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden">
      <MapContainer
        center={centerPosition}
        zoom={7}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        {/* OpenStreetMap tiles */}
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Example marker */}
        <Marker position={centerPosition}>
          <Popup>
            We are operating from here 🚚
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default CoverageMap;
