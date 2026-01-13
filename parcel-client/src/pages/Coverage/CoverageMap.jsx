import React, { useEffect, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

/* Fly to searched district */
const FlyToLocation = ({ selectedCenter }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedCenter) {
      map.flyTo(
        [selectedCenter.latitude, selectedCenter.longitude],
        10,
        { duration: 1.5 }
      );
    }
  }, [selectedCenter, map]);

  return null;
};

const CoverageMap = ({ serviceCenters, selectedCenter }) => {
  const centerPosition = [23.8103, 90.4125]; // Bangladesh center

  return (
    <div className="w-full h-[700px] rounded-xl overflow-hidden">
      <MapContainer
        center={centerPosition}
        zoom={7}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Move map */}
        <FlyToLocation selectedCenter={selectedCenter} />

        {serviceCenters.map((center, index) => {
          const markerRef = useRef(null);

          /* Auto-open popup when matched */
          useEffect(() => {
            if (
              selectedCenter &&
              selectedCenter.district === center.district
            ) {
              markerRef.current?.openPopup();
            }
          }, [selectedCenter, center.district]);

          return (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
              ref={markerRef}
            >
              <Popup>
                <div className="text-sm">
                  <h3 className="font-bold text-base">
                    {center.district}
                  </h3>
                  <p className="text-xs text-gray-600">
                    Region: {center.region}
                  </p>

                  <p className="mt-1 font-semibold">
                    Covered Areas:
                  </p>
                  <ul className="list-disc list-inside text-xs">
                    {center.covered_area.map((area, i) => (
                      <li key={i}>{area}</li>
                    ))}
                  </ul>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default CoverageMap;
