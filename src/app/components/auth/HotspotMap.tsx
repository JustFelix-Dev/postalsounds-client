"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

interface Hotspot {
  id: number | string;
  title: string;
  short_description: string;
  location_lat: number | string;
  location_lng: number | string;
  image?: string;
}

interface HotspotMapProps {
  hotspots: Hotspot[];
}

export default function HotspotMap({ hotspots }: HotspotMapProps) {
  const [selected, setSelected] = useState<Hotspot | null>(null);

  return (
    <div className="w-full h-screen rounded-xl overflow-hidden">
      <Map
        initialViewState={{
          longitude: -3.7038,
          latitude: 40.4168,
          zoom: 12,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        {hotspots.map((spot) => {
          const lat = Number(spot.location_lat);
          const lng = Number(spot.location_lng);

          // Skip invalid coordinates
          if (isNaN(lat) || isNaN(lng)) return null;

          return (
            <Marker
              key={spot.id}
              longitude={lng}
              latitude={lat}
              anchor="bottom"
            >
              <div
                onClick={() => setSelected(spot)}
                className="cursor-pointer"
              >
                <MapPin
                  size={28}
                  className="text-orange-900 drop-shadow"
                  strokeWidth={1}
                  style={{ fill: "#7e2a0c" }}
                />
              </div>
            </Marker>
          );
        })}

        {selected && (
          <Popup
            longitude={Number(selected.location_lng)}
            latitude={Number(selected.location_lat)}
            onClose={() => setSelected(null)}
            closeOnClick={false}
            anchor="top"
          >
            <div className="w-48">
              {selected.image && (
                <Image
                  src={selected.image}
                  alt={selected.title}
                  width={200}
                  height={120}
                  className="rounded-md mb-2 w-full h-24 object-cover"
                />
              )}
              <strong>{selected.title}</strong>
              <p className="text-sm">{selected.short_description}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
