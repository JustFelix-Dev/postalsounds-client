"use client";

import { useEffect, useState } from "react";
import HotspotMap from "../components/auth/HotspotMap";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/app/lib/supabaseClient";

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

interface Hotspot {
  id: number;
  title: string;
  short_description: string;
  location_lat: number;
  location_lng: number;
  image?: string;
}

export default function HotspotsPage() {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ email: string; full_name?: string } | null>(null);

  useEffect(() => {
    // Fetch user data from Supabase
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
    //   console.log("Fetched User:", user)
      if (user) {
        setUser({
          email: user.email ?? "",
          full_name: user.user_metadata.full_name ?? "",
        });
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchHotspots = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API}/api/hotspots?populate=*`);
      const data = await res.json();
      setHotspots(
        data?.data?.map((item: HotspotData) => ({
          id: item.id,
          title: item.title,
          short_description: item.short_description,
          location_lat: item.location_lat,
          location_lng: item.location_lng,
          image: item.images?.[0]?.url,
        }))
      );
      setLoading(false);
    };

    fetchHotspots();
  }, []);


//   console.log("User", user)

  return (
    <main className="p-6 relative">
      {/* User info at top-right */}
      {user && (
        <div className="absolute top-4 right-4 text-right">
          <p className="font-semibold">{user.full_name || "User"}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      )}

      <h1 className="text-2xl font-semibold mb-4 text-center">Madrid Music Hotspots</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <HotspotMap hotspots={hotspots} />
      )}
    </main>
  );
}
