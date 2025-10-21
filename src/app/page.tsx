'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Index() {
  const router = useRouter();

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen px-6 text-white relative"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.95)),
          url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2831')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl z-10"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
          Discover the <span className=" text-white">Sound of Madrid</span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-300 my-8">
          Explore authentic local music stories and hidden gems — guided by the people who live them.  
          A premium, slow-media experience crafted for curious travelers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-12 justify-center">
          <Button
            size="lg"
            className="rounded-full px-8 py-6 text-base font-semibold"
            onClick={() => router.push("/register")}
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 py-6 text-base font-semibold border-white text-black"
            onClick={() => router.push("/about")}
          >
            Learn More
          </Button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="mt-20 text-sm text-neutral-400 z-10">
        © {new Date().getFullYear()} Postal Sounds — Experience the rhythm of travel.
      </footer>
    </main>
  );
}
