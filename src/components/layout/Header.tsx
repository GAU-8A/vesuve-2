"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Artist Roster" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/booking", label: "Booking" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-6">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <h1 className="text-2xl md:text-3xl font-light tracking-[0.3em] uppercase">
            vesuve
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium tracking-wider uppercase opacity-70 hover:opacity-100 transition-opacity"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="relative z-50 md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 6 : 0,
            }}
            className="w-6 h-0.5 bg-white block"
          />
          <motion.span
            animate={{
              opacity: isMenuOpen ? 0 : 1,
            }}
            className="w-6 h-0.5 bg-white block"
          />
          <motion.span
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              y: isMenuOpen ? -6 : 0,
            }}
            className="w-6 h-0.5 bg-white block"
          />
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 flex items-center justify-center"
            >
              <ul className="flex flex-col items-center gap-8">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="text-3xl font-light tracking-wider uppercase"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
