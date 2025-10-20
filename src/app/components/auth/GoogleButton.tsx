"use client";

import { supabase } from "@/app/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function GoogleButton() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/hotspots`,
      },
    });
    if (error) console.error(error);
  };

  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={handleGoogleLogin}
    >
      Continue with Google
    </Button>
  );
}
