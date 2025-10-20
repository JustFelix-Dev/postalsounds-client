// components/HotspotMap.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Hotspot {
  title: string;
  short_description: string;
  location_lat: number;
  location_lng: number;
}

interface HotspotMapProps {
  hotspots: Hotspot[];
}

export default function HotspotMap({ hotspots }: HotspotMapProps) {
  return (
    <MapContainer
      center={[40.4168, -3.7038]} // Madrid center
      zoom={12}
      style={{ height: "500px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      {hotspots.map((spot, i) => (
        <Marker
          key={i}
          position={[spot.location_lat, spot.location_lng]}
          icon={defaultIcon}
        >
          <Popup>
            <strong>{spot.title}</strong>
            <p>{spot.short_description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
