"use client";

import { useEffect, useState } from "react";
import HotspotMap from "../components/auth/HotspotMap";

interface HotspotImage {
  url: string;
}

interface HotspotData {
    id: number;
    title: string;
    short_description: string;
    location_lat: number;
    location_lng: number;
    images: HotspotImage[];
  }
export default function HotspotsPage() {
  const [hotspots, setHotspots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotspots = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API}/api/hotspots?populate=*`);
      console.log('Response:', res);
      const  data  = await res.json();
      console.log('Data:', data)
      setHotspots(
        data?.data?.map((item: HotspotData ) => ({
          id: item.id,
          title: item.title,
          short_description: item.short_description,
          location_lat: item.location_lat,
          location_lng: item.location_lng,
          image: item.images[0].url
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
