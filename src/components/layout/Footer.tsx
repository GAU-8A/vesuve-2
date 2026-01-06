import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8 md:px-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Legal */}
        <Link
          href="/legal"
          className="text-sm opacity-50 hover:opacity-100 transition-opacity"
        >
          Legal
        </Link>

        {/* Copyright */}
        <p className="text-sm opacity-50">Copyright © 2024</p>

        {/* Social */}
        <a
          href="https://www.instagram.com/vesuveagency/"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-50 hover:opacity-100 transition-opacity"
          aria-label="Instagram"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>

        {/* Agency name */}
        <p className="text-sm opacity-50">Vesuve Agency | France</p>
      </div>
    </footer>
  );
}
