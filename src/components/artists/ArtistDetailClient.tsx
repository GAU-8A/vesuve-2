"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Artist } from "@/lib/artists";

// Social icons as SVG components
const SocialIcons = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  soundcloud: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.052-.1-.084-.1zm-.899 1.024c-.009.058-.054.097-.104.097-.05 0-.091-.039-.099-.097l-.186-1.13.186-1.179c.008-.06.05-.098.099-.098.05 0 .095.039.104.098l.214 1.179-.214 1.13zm1.83-2.096c-.058 0-.104.045-.113.104l-.198 2.208.198 2.156c.009.059.055.104.113.104.057 0 .104-.045.111-.104l.226-2.156-.226-2.208c-.007-.059-.054-.104-.111-.104zm6.592.391c-.399 0-.778.08-1.124.224-.233-2.618-2.424-4.674-5.104-4.674-.686 0-1.345.142-1.944.398-.224.097-.283.196-.286.389v9.491c.003.2.157.367.357.386h8.101c1.54 0 2.788-1.248 2.788-2.788 0-1.54-1.248-2.788-2.788-2.788z"/>
    </svg>
  ),
  spotify: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  ),
  bandcamp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z"/>
    </svg>
  ),
  beatport: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M21.429 14.571c-.572 0-1.072.214-1.429.572V8.857c0-1.286-1-2.286-2.286-2.286H12c-.357-.357-.857-.571-1.429-.571C9.286 6 8.286 7 8.286 8.286c0 1.285 1 2.285 2.285 2.285.572 0 1.072-.214 1.429-.571h5.714c.143 0 .286.143.286.286v6.857c-.357-.357-.857-.572-1.429-.572-1.285 0-2.285 1-2.285 2.286 0 1.286 1 2.286 2.285 2.286.572 0 1.072-.214 1.429-.572v.286c0 .143-.143.286-.286.286H6.857c-.143 0-.286-.143-.286-.286V6.857c0-.143.143-.286.286-.286h5.714c.357.357.857.572 1.429.572 1.286 0 2.286-1 2.286-2.286C16.286 3.571 15.286 2.571 14 2.571c-.572 0-1.072.214-1.429.572H6.857C5.571 3.143 4.571 4.143 4.571 5.429v13.714c0 1.286 1 2.286 2.286 2.286h10.857c1.286 0 2.286-1 2.286-2.286v-.286c.357.358.857.572 1.429.572 1.285 0 2.285-1 2.285-2.286 0-1.285-1-2.571-2.285-2.571z"/>
    </svg>
  ),
  residentAdvisor: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.071 19.071c-3.905 3.905-10.237 3.905-14.142 0-3.905-3.905-3.905-10.237 0-14.142 3.905-3.905 10.237-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.5 14.5h-2v-4h-3v4h-2v-9h2v3h3v-3h2v9z"/>
    </svg>
  ),
};

interface ArtistDetailClientProps {
  artist: Artist;
}

export default function ArtistDetailClient({ artist }: ArtistDetailClientProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Scanlines */}
      <div className="scanlines" />
      <div className="grain" />

      {/* Back Button */}
      <Link
        href="/"
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-sm tracking-[0.2em] uppercase opacity-60 hover:opacity-100 transition-opacity"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end pb-16">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={artist.photo}
            alt={artist.name}
            fill
            priority
            className="object-cover"
          />
          {/* Color overlay */}
          <div
            className="absolute inset-0 mix-blend-multiply opacity-40"
            style={{ backgroundColor: artist.color }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-8 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p
              className="text-xs md:text-sm tracking-[0.3em] uppercase font-light mb-4"
              style={{ color: artist.color }}
            >
              {artist.genre}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[0.9] mb-8">
              {artist.name}
            </h1>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              {Object.entries(artist.socials).map(([platform, url]) => {
                if (!url) return null;
                const icon = SocialIcons[platform as keyof typeof SocialIcons];
                if (!icon) return null;

                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-60 hover:opacity-100 transition-all duration-300"
                    style={{ color: artist.color }}
                  >
                    {icon}
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Biography */}
      <section className="py-16 px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl font-black tracking-[0.2em] uppercase mb-8"
            style={{ color: artist.color }}
          >
            Biography
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {artist.bio.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="text-base md:text-lg leading-relaxed font-light opacity-80"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Label info */}
          {artist.label && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 pt-8 border-t border-white/10"
            >
              <p className="text-xs tracking-[0.2em] uppercase opacity-50 mb-2">Label</p>
              {artist.label.url ? (
                <a
                  href={artist.label.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold tracking-wide transition-colors"
                  style={{ color: artist.color }}
                >
                  {artist.label.name}
                </a>
              ) : (
                <p className="text-xl font-bold tracking-wide">{artist.label.name}</p>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Spotify Embed */}
      {artist.spotifyArtistId && (
        <section className="py-16 px-8 md:px-16 lg:px-24 bg-white/5">
          <div className="max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xl font-black tracking-[0.2em] uppercase mb-8"
              style={{ color: artist.color }}
            >
              Listen
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <iframe
                src={`https://open.spotify.com/embed/artist/${artist.spotifyArtistId}?utm_source=generator&theme=0`}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Booking CTA */}
      <section className="py-16 px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase">
              Book {artist.name}
            </h2>

            <a
              href={`mailto:info@vesuveagency.com?subject=Booking Request: ${artist.name}`}
              className="inline-block px-8 py-3 text-sm tracking-[0.2em] uppercase font-semibold border-2 transition-all duration-300 text-center"
              style={{
                borderColor: artist.color,
                color: artist.color,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = artist.color;
                e.currentTarget.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = artist.color;
              }}
            >
              Contact
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-white/10">
        <div className="max-w-3xl flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-black tracking-[0.3em] uppercase opacity-60 hover:opacity-100 transition-opacity"
          >
            VESUVE
          </Link>
          <p className="text-xs tracking-wider opacity-40">
            &copy; {new Date().getFullYear()} Vesuve Agency
          </p>
        </div>
      </footer>
    </div>
  );
}
