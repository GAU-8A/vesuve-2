# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vesuve Agency website - Artist booking/management agency for electronic music. Built with Next.js and Sanity CMS.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **CMS**: Sanity v3
- **Styling**: Tailwind CSS v4
- **Animations**: PixiJS (displacement effects), Framer Motion, Lenis (smooth scroll)
- **Deployment**: Vercel
- **Email**: Resend
- **Captcha**: Cloudflare Turnstile

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Sanity Studio available at /studio
```

## Architecture

```
/src
├── /app                    # Next.js App Router pages
│   ├── /artists/[slug]     # Artist detail pages
│   ├── /booking            # Booking form
│   ├── /news               # Blog/news
│   ├── /studio             # Sanity Studio
│   └── page.tsx            # Homepage
├── /components
│   ├── /artists            # Artist-related components
│   ├── /effects            # WebGL/visual effects
│   ├── /layout             # Header, Footer, etc.
│   └── /ui                 # Reusable UI components
├── /hooks                  # Custom React hooks
├── /lib                    # Utilities and helpers
├── /sanity
│   ├── /schemas            # Sanity document schemas
│   └── /lib                # Sanity client, queries, image helpers
└── /styles                 # Additional styles
/public                     # Static assets
/sanity.config.ts           # Sanity configuration
```

## Key Features

- Artist pages with Spotify/video embeds
- Booking form with email notifications (Resend)
- Blog/news section
- Newsletter signup
- WebGL displacement effects on images (PixiJS)
- Grain and scanlines visual overlays
- Smooth scroll (Lenis)

## Sanity Schemas

- `artist`: Artist profiles with photos, bio, social links, Spotify ID
- `post`: Blog posts with rich text content
- `siteSettings`: Global site configuration

## Environment Variables

See `.env.example` for required variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `RESEND_API_KEY`
- `BOOKING_EMAIL`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
