"use client";

import { useEffect, useState } from "react";
import HotspotMap from "../components/auth/HotspotMap";

interface HotspotData {
    id: number;
    attributes: {
      title: string;
      short_description: string;
      location_lat: number;
      location_lng: number;
    };
  }
export default function HotspotsPage() {
  const [hotspots, setHotspots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotspots = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/hotspots`);
      const { data } = await res.json();
      setHotspots(
        data.map((item: HotspotData ) => ({
          id: item.id,
          title: item.attributes.title,
          short_description: item.attributes.short_description,
          location_lat: item.attributes.location_lat,
          location_lng: item.attributes.location_lng,
        }))
      );
      setLoading(false);
    };

    fetchHotspots();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading hotspots...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">Madrid Music Hotspots</h1>
      <HotspotMap hotspots={hotspots} />
    </main>
  );
}
