"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import GoogleButton from "./GoogleButton";
import { supabase } from "@/app/lib/supabaseClient";

export default function AuthForm({ type }: { type: "login" | "register" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let response;
      if (type === "login") {
        response = await supabase.auth.signInWithPassword({ email, password });
      } else {
        response = await supabase.auth.signUp({ email, password });
      }

      if (response.error) {
        setMessage({ text: response.error.message, error: true });
      } else {
        setMessage({
          text:
            type === "login"
              ? "Login successful! Redirecting..."
              : "Signup successful! Redirecting...",
          error: false,
        });
        setTimeout(() => router.push("/hotspots"), 1000);
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: "An unexpected error occurred.", error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-sm shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            {type === "login" ? "Welcome Back" : "Create Account"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Please wait..." : type === "login" ? "Login" : "Register"}
            </Button>

            {message && (
              <p
                className={`text-center text-sm ${
                  message.error ? "text-red-600" : "text-green-600"
                }`}
              >
                {message.text}
              </p>
            )}
          </form>

          <Separator className="my-4" />
          <GoogleButton />

          <p className="text-center text-sm mt-4">
            {type === "login" ? (
              <>
                Don’t have an account?{" "}
                <a href="/register" className="text-blue-600 underline">
                  Sign up
                </a>
              </>
            ) : (
              <>
                Already registered?{" "}
                <a href="/login" className="text-blue-600 underline">
                  Log in
                </a>
              </>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
