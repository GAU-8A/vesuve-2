"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

interface ArtistCardProps {
  name: string;
  slug: string;
  photo: string;
  photoHover?: string;
  genre?: string;
}

export default function ArtistCard({
  name,
  slug,
  photo,
  photoHover,
  genre,
}: ArtistCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/artists/${slug}`}>
      <motion.article
        className="artist-card relative aspect-[3/4] group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Main Image */}
        <Image
          src={photo}
          alt={name}
          fill
          className="object-cover transition-opacity duration-500"
          style={{ opacity: isHovered && photoHover ? 0 : 1 }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Hover Image */}
        {photoHover && (
          <Image
            src={photoHover}
            alt={`${name} - performing`}
            fill
            className="object-cover transition-opacity duration-500"
            style={{ opacity: isHovered ? 1 : 0 }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Artist Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <h3
            className="text-xl md:text-2xl font-semibold tracking-wider uppercase text-glitch"
            data-text={name}
          >
            {name}
          </h3>
          {genre && (
            <p className="text-sm opacity-60 mt-1 tracking-wide">{genre}</p>
          )}
        </div>
      </motion.article>
    </Link>
  );
}
