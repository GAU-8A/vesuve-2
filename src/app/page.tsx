"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // Handle tap on mobile (select artist, don't navigate)
  const handleArtistTap = (e: React.MouseEvent, index: number) => {
    if (isMobile && index !== activeArtist) {
      e.preventDefault();
      setActiveArtist(index);
    }
  };

  // Swipe handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipe = 50;

    if (Math.abs(diff) > minSwipe) {
      if (diff > 0 && activeArtist < artists.length - 1) {
        // Swipe left = next artist
        setActiveArtist(prev => prev + 1);
      } else if (diff < 0 && activeArtist > 0) {
        // Swipe right = previous artist
        setActiveArtist(prev => prev - 1);
      }
    }
  }, [activeArtist]);

  const currentArtist = artists[activeArtist];

  return (
    <div className="h-screen w-screen overflow-hidden bg-black text-white relative">
      {/* Logo */}
      <header className="absolute top-0 left-0 right-0 z-50 flex justify-center py-6 md:py-8">
        <Image
          src="/images/logo-white.png"
          alt="Vesuve Agency"
          width={200}
          height={50}
          className="h-6 md:h-8 w-auto"
          priority
        />
      </header>

      {/* Main Content */}
      <main className="h-full flex flex-col md:flex-row">
        {/* Image Area (top on mobile, right on desktop) */}
        <div
          className="w-full md:w-[65%] h-[55%] md:h-full relative order-1 md:order-2"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Base image */}
          <Image
            src={currentArtist.photo}
            alt={currentArtist.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 65vw"
          />

          {/* Displacement Canvas */}
          {showDisplacement && !isMobile && (
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
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none" />

          {/* Mobile: Swipe indicator dots */}
          {isMobile && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
              {artists.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveArtist(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeArtist === index
                      ? "bg-white scale-125"
                      : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Mobile: View Profile button */}
          {isMobile && (
            <Link
              href={`/artists/${currentArtist.slug}`}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 px-6 py-2 border border-white/50 text-xs tracking-[0.2em] uppercase backdrop-blur-sm bg-black/30 active:bg-white active:text-black transition-colors"
            >
              View Profile
            </Link>
          )}

          {/* Artist name overlay on image (desktop only) */}
          <div className="hidden md:block absolute bottom-12 right-12 z-10 pointer-events-none">
            <p
              className="text-7xl md:text-8xl lg:text-9xl font-black opacity-10 tracking-tighter transition-all duration-500"
              style={{ color: currentArtist.color }}
            >
              {currentArtist.name.split(" ")[0]}
            </p>
          </div>
        </div>

        {/* Artist List (bottom on mobile, left on desktop) */}
        <div className="w-full md:w-[35%] h-[45%] md:h-full flex flex-col justify-center px-6 md:pl-12 lg:pl-20 relative z-20 order-2 md:order-1">
          <nav>
            <ul className="space-y-1 md:space-y-2">
              {artists.map((artist, index) => (
                <li key={artist.slug}>
                  <Link
                    href={`/artists/${artist.slug}`}
                    onClick={(e) => handleArtistTap(e, index)}
                    className={`
                      block text-xl md:text-4xl lg:text-5xl font-bold tracking-tight
                      transition-all duration-300 ease-out
                      ${activeArtist === index
                        ? "opacity-100 md:translate-x-4"
                        : "opacity-40"
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
          <div className="mt-4 md:mt-8">
            <p
              className="text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-60 transition-all duration-300"
              style={{ color: currentArtist.color }}
            >
              {currentArtist.genre}
            </p>
          </div>

          {/* Nav Links (desktop only) */}
          <div className="hidden md:flex mt-12 gap-8">
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
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 md:py-6">
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
        <p className="text-[10px] md:text-xs opacity-30">© 2024 Vesuve Agency — France</p>
      </footer>

      {/* Scanlines overlay */}
      <div className="scanlines" />
      {/* Grain overlay */}
      <div className="grain" />
    </div>
  );
}
