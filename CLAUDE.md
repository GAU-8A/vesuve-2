# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vesuve Agency website - Artist booking/management agency for electronic music. Built with Next.js and Sanity CMS.

---

## ⚠️ DIRECTION ARTISTIQUE — OBLIGATOIRE

**Référence principale : https://www.hyper-dreams.com/**

Le design DOIT reproduire l'ambiance et les effets de Hyper Dreams. Ce n'est PAS un site corporate classique. C'est un site immersif, underground, techno.

### Layout Homepage (OBLIGATOIRE)

```
┌─────────────────────────────────────────────────────────────┐
│  LOGO "vesuve" centré                                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  LISTE ARTISTES        │    IMAGE ARTISTE PLEIN ÉCRAN      │
│  (colonne gauche)      │    (avec effet displacement)       │
│                        │                                    │
│  > NICO MORENO         │    ┌─────────────────────────┐    │
│    PAWLOWSKI           │    │                         │    │
│    ØTTA                │    │   PHOTO QUI SE DÉFORME  │    │
│    UNDER THE MOON      │    │   AU PASSAGE SOURIS     │    │
│    MATRAKK             │    │                         │    │
│                        │    └─────────────────────────┘    │
│                        │                                    │
├─────────────────────────────────────────────────────────────┤
│  Footer minimal                                             │
└─────────────────────────────────────────────────────────────┘
```

### Effets Visuels OBLIGATOIRES

1. **Displacement Shader (WebGL/PixiJS)** — L'effet signature
   - Les images se déforment comme de l'eau quand on passe la souris
   - Utiliser PixiJS avec displacement map
   - Intensité : visible mais pas exagérée

2. **Scanlines CRT**
   - Lignes horizontales fines sur tout le site
   - Opacité ~20-30%
   - Donne l'effet écran cathodique/VHS

3. **Grain animé**
   - Texture de bruit par-dessus le site
   - Animation subtile
   - Opacité ~5%

4. **Smooth Scroll (Lenis)**
   - Scroll fluide avec inertie
   - Transitions douces

5. **Glitch Text**
   - Au hover, le texte "bug" brièvement
   - Effet RGB split

### Palette de Couleurs

```css
--background: #000000;     /* Noir pur */
--foreground: #ffffff;     /* Blanc */
--accent: variable;        /* Couleur différente par artiste */
```

**Couleurs par artiste (pour effets duotone) :**
- Nico Moreno : Gris/Noir
- Pawlowski : Rouge #FF0000
- ØTTA : Cyan #00FFFF
- Under The Moon : Vert #00FF00
- MATRAKK : Vert lime #AAFF00

### Typographie

- **Logo** : "vesuve" en minuscules, font custom ou Raleway Light, tracking large
- **Noms artistes** : All-caps, bold condensé
- **Body** : Raleway ou Roboto Condensed

### Assets

**Logo Vesuve :**
- Blanc : `https://vesuveagency.com/wp-content/uploads/2024/09/LOGO_VESUVE_BLANC.png`
- Noir : `https://vesuveagency.com/wp-content/uploads/2024/09/LOGO_VESUVE_NOIR.png`
- Favicon : `https://vesuveagency.com/wp-content/uploads/2024/09/LOGO_V_BLANC.png`

**Photos artistes :** Voir `.context/VESUVE_DATA.md` pour toutes les URLs

---

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
npm install      # Install dependencies
npm run dev      # Run development server (localhost:3000)
npm run build    # Build for production
npm start        # Start production server
```

## Architecture

```
/src
├── /app                    # Next.js App Router pages
│   ├── /artists/[slug]     # Artist detail pages
│   ├── /booking            # Booking form
│   ├── /news               # Blog/news
│   ├── /studio             # Sanity Studio (/studio)
│   └── page.tsx            # Homepage
├── /components
│   ├── /artists            # Artist-related components
│   ├── /effects            # WebGL/visual effects (displacement shader)
│   ├── /layout             # Header, Footer
│   └── /ui                 # Reusable UI components
├── /hooks                  # Custom React hooks
├── /lib                    # Utilities and helpers
├── /sanity
│   ├── /schemas            # Sanity document schemas
│   └── /lib                # Sanity client, queries, image helpers
└── /styles                 # Additional styles
/public
├── /images                 # Static images
└── logo.png                # Logo Vesuve
```

## Key Features

- Homepage avec slider artistes style Hyper Dreams
- Effet displacement WebGL sur les images (PixiJS)
- Pages artistes avec Spotify/video embeds
- Formulaire booking avec email (Resend) + captcha (Turnstile)
- Blog/actualités
- Newsletter signup
- SEO optimisé pour "[artiste] + booking"

## Sanity Schemas

- `artist`: nom, slug, photo, photoHover, type, status, genre, bio, spotifyId, videos, socialLinks
- `post`: title, slug, publishedAt, coverImage, body, tags
- `siteSettings`: logo, featuredArtists, bookingEmail, socialLinks

## Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
RESEND_API_KEY=xxx
BOOKING_EMAIL=info@vesuveagency.com
NEXT_PUBLIC_TURNSTILE_SITE_KEY=xxx
TURNSTILE_SECRET_KEY=xxx
```

---

## ❌ CE QU'IL NE FAUT PAS FAIRE

- Grille d'artistes classique type portfolio
- Design corporate/clean sans effets
- Ignorer l'effet displacement — c'est LE truc signature
- Utiliser des couleurs autres que noir/blanc + accents
- Oublier les scanlines et le grain
- Faire un site "normal"

## ✅ CE QU'IL FAUT FAIRE

- S'inspirer FORTEMENT de hyper-dreams.com
- Implémenter l'effet displacement en priorité
- Créer une ambiance immersive, underground
- Utiliser le vrai logo Vesuve
- Faire un site qui "claque" visuellement
