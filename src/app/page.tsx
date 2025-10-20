'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Index() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-neutral-100 text-neutral-900 px-6">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-4">
          Discover the <span className="text-primary">Sound of Madrid</span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 mb-8">
          Explore authentic local music stories and hidden gems — guided by the people who live them.  
          A premium, slow-media experience crafted for curious travelers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="rounded-full px-8 py-6 text-base font-semibold"
            onClick={() => router.push("/login")}
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 py-6 text-base font-semibold"
            onClick={() => router.push("/about")}
          >
            Learn More
          </Button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="mt-20 text-sm text-neutral-500">
        © {new Date().getFullYear()} Postal Sounds — Experience the rhythm of travel.
      </footer>
    </main>
  );
}
