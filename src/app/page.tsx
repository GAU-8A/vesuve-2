"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const artists = [
  {
    name: "NICO MORENO",
    slug: "nico-moreno",
    photo: "https://vesuveagency.com/wp-content/uploads/2024/06/Nico-2-scaled.jpeg",
    color: "#888888",
  },
  {
    name: "PAWLOWSKI",
    slug: "pawlowski",
    photo: "https://vesuveagency.com/wp-content/uploads/2024/06/Pawlo-4-scaled-e1718199223772.jpeg",
    color: "#FF0000",
  },
  {
    name: "ØTTA",
    slug: "otta",
    photo: "https://vesuveagency.com/wp-content/uploads/2024/04/otta_press-0-scaled-e1717593036363.jpg",
    color: "#00FFFF",
  },
  {
    name: "UNDER THE MOON",
    slug: "under-the-moon",
    photo: "https://vesuveagency.com/wp-content/uploads/2024/06/Numerique_SamuelNogues_003-scaled.jpg",
    color: "#00FF00",
  },
  {
    name: "MATRAKK",
    slug: "matrakk",
    photo: "https://vesuveagency.com/wp-content/uploads/2024/11/PHOTO-2024-11-21-17-18-44-1.jpg",
    color: "#AAFF00",
  },
];

export default function Home() {
  const [activeArtist, setActiveArtist] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleArtistHover = (index: number) => {
    if (index !== activeArtist) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveArtist(index);
        setIsTransitioning(false);
      }, 150);
    }
  };

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

          {/* Nav Links */}
          <div className="mt-16 flex gap-8">
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

        {/* Right Column - Artist Image */}
        <div className="w-[65%] h-full relative">
          {/* Image avec effet de transition */}
          <div
            className={`
              absolute inset-0 transition-opacity duration-300
              ${isTransitioning ? "opacity-0" : "opacity-100"}
            `}
          >
            <Image
              src={artists[activeArtist].photo}
              alt={artists[activeArtist].name}
              fill
              className="object-cover"
              style={{
                filter: `grayscale(100%) sepia(20%) hue-rotate(${
                  activeArtist * 60
                }deg)`,
                mixBlendMode: "normal",
              }}
              priority
              sizes="65vw"
            />
            {/* Color overlay */}
            <div
              className="absolute inset-0 mix-blend-multiply opacity-60"
              style={{ backgroundColor: artists[activeArtist].color }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
          </div>

          {/* Artist name overlay on image */}
          <div className="absolute bottom-12 right-12 z-10">
            <p
              className="text-8xl md:text-9xl font-black opacity-10 tracking-tighter"
              style={{ color: artists[activeArtist].color }}
            >
              {artists[activeArtist].name.split(" ")[0]}
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
