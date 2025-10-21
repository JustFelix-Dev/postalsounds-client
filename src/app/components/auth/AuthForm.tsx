"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
// import GoogleButton from "./GoogleButton";
import { supabase } from "@/app/lib/supabaseClient";
import { Eye, EyeOff } from "lucide-react";

export default function AuthForm({ type }: { type: "login" | "register" }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        // Register with display name saved in 'user_metadata'
        response = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name }, // correct field
          },
        });
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
    <div className="flex min-h-screen">
      {/* Left side */}
      <div className="hidden md:flex w-1/2 bg-black text-white justify-between  flex-col  px-8 py-14">
        <h1 className="text-5xl font-bold mb-4">Postal Sounds</h1>
        <p className="text-lg max-w-lg">
          Discover authentic music hotspots and stories from Madrid. Sign up or log in to start your journey!
        </p>
      </div>

      {/* Right side - form */}
      <div className="flex w-full md:w-1/2 justify-center items-center p-4 bg-gray-50">
        <Card className="w-full max-w-md shadow-md">
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold">
              {type === "login" ? "Welcome Back" : "Create Account"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {type === "register" && (
                <Input
                  placeholder="Full Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}
              <Input
                placeholder="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {/* Password input with toggle */}
              <div className="relative">
                <Input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

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
            {/* <GoogleButton /> */}

            <p className="text-center text-sm mt-4">
              {type === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
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
    </div>
  );
}
