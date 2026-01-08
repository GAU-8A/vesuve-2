"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { artists } from "@/lib/artists";

// Dynamic import for ArtistDisplacement (client-side only, preloads all textures)
const ArtistDisplacement = dynamic(
  () => import("@/components/effects/ArtistDisplacement"),
  { ssr: false }
);

export default function Home() {
  const [activeArtist, setActiveArtist] = useState(0);
  const [showDisplacement, setShowDisplacement] = useState(false);

  // Enable displacement after mount
  useEffect(() => {
    const timer = setTimeout(() => setShowDisplacement(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleArtistHover = (index: number) => {
    if (index !== activeArtist) {
      setActiveArtist(index);
    }
  };

  const currentArtist = artists[activeArtist];

  return (
    <div className="h-screen w-screen overflow-hidden bg-black text-white relative">
      {/* Logo */}
      <header className="absolute top-0 left-0 right-0 z-50 flex justify-center py-8">
        <Image
          src="/images/logo-white.png"
          alt="Vesuve Agency"
          width={200}
          height={50}
          className="h-8 w-auto"
          priority
        />
      </header>

      {/* Main Content */}
      <main className="h-full flex">
        {/* Left Column - Artist List */}
        <div className="w-[35%] h-full flex flex-col justify-center pl-12 md:pl-20 relative z-20">
          <nav>
            <ul className="space-y-2">
              {artists.map((artist, index) => (
                <li key={artist.slug}>
                  <Link
                    href={`/artists/${artist.slug}`}
                    className={`
                      block text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight
                      transition-all duration-300 ease-out
                      ${activeArtist === index
                        ? "opacity-100 translate-x-4"
                        : "opacity-40 hover:opacity-70"
                      }
                    `}
                    onMouseEnter={() => handleArtistHover(index)}
                    style={{
                      color: activeArtist === index ? artist.color : "white",
                    }}
                  >
                    {artist.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Genre indicator */}
          <div className="mt-8">
            <p
              className="text-xs tracking-[0.3em] uppercase opacity-60 transition-all duration-300"
              style={{ color: currentArtist.color }}
            >
              {currentArtist.genre}
            </p>
          </div>

          {/* Nav Links */}
          <div className="mt-12 flex gap-8">
            <Link
              href="/about"
              className="text-sm uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity"
            >
              About
            </Link>
            <Link
              href="/booking"
              className="text-sm uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity"
            >
              Booking
            </Link>
          </div>
        </div>

        {/* Right Column - Artist Image with Displacement */}
        <div className="w-[65%] h-full relative">
          {/* Base image - always visible as fallback */}
          <Image
            src={currentArtist.photo}
            alt={currentArtist.name}
            fill
            className="object-cover"
            priority
            sizes="65vw"
          />

          {/* Displacement Canvas - single instance, preloads all textures */}
          {showDisplacement && (
            <ArtistDisplacement
              artists={artists}
              activeIndex={activeArtist}
            />
          )}

          {/* Color overlay */}
          <div
            className="absolute inset-0 mix-blend-color opacity-40 pointer-events-none transition-colors duration-500"
            style={{ backgroundColor: currentArtist.color }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent pointer-events-none" />

          {/* Artist name overlay on image */}
          <div className="absolute bottom-12 right-12 z-10 pointer-events-none">
            <p
              className="text-7xl md:text-8xl lg:text-9xl font-black opacity-10 tracking-tighter transition-all duration-500"
              style={{ color: currentArtist.color }}
            >
              {currentArtist.name.split(" ")[0]}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-50 flex justify-between items-center px-12 py-6">
        <a
          href="https://www.instagram.com/vesuveagency/"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-50 hover:opacity-100 transition-opacity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
        <p className="text-xs opacity-30">© 2024 Vesuve Agency — France</p>
      </footer>

      {/* Scanlines overlay */}
      <div className="scanlines" />
      {/* Grain overlay */}
      <div className="grain" />
    </div>
  );
}
