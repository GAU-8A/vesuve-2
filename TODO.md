# TODO — Vesuve Agency

## ✅ Fait

- [x] Expression de besoin validée
- [x] Charte graphique récupérée (logo, couleurs, typo)
- [x] Scaffold Next.js 15 + Sanity v3
- [x] Homepage style Hyper Dreams
  - [x] Layout liste artistes + image plein écran
  - [x] Effet duotone par artiste
  - [x] Transitions au hover
  - [x] Scanlines + grain overlay
  - [x] Logo Vesuve
  - [x] Footer minimal

## 🔜 À faire

### Priorité 1 — Effet Displacement WebGL
- [ ] Créer composant PixiJS pour displacement shader
- [ ] Appliquer sur l'image artiste au hover
- [ ] Ajuster l'intensité et la fluidité
- **Ref technique** : https://pixijs.com/8.x/examples/filters-advanced/displacement-map

### Priorité 2 — Pages Artistes Dynamiques
- [ ] Créer route `/artists/[slug]`
- [ ] Layout page artiste (photo, bio, liens)
- [ ] Intégration Spotify embed
- [ ] Intégration vidéos YouTube/Vimeo
- [ ] Liens sociaux (IG, SoundCloud, Bandcamp, RA)
- [ ] Bouton "Book this artist"

### Priorité 3 — Formulaire Booking
- [ ] Créer page `/booking`
- [ ] Formulaire avec champs : artiste, event type, date, lieu, budget, message
- [ ] Intégration Cloudflare Turnstile (captcha)
- [ ] Envoi email via Resend
- [ ] Confirmation + validation

### Priorité 4 — Déploiement
- [ ] Créer projet Sanity (`npx sanity init`)
- [ ] Configurer variables d'environnement
- [ ] Déployer sur Vercel
- [ ] Connecter domaine vesuveagency.com

### Priorité 5 — Blog & Newsletter
- [ ] Page `/news` avec liste articles
- [ ] Page article individuel
- [ ] Formulaire inscription newsletter
- [ ] Intégration Mailchimp ou Buttondown

### Priorité 6 — Polish
- [ ] Responsive mobile
- [ ] Smooth scroll (Lenis)
- [ ] Animations Framer Motion
- [ ] SEO final (sitemap, robots.txt, schema.org)
- [ ] Performance (Core Web Vitals)

---

## 📁 Fichiers clés

- `CLAUDE.md` — Instructions DA obligatoires
- `.context/VESUVE_DATA.md` — Données artistes (photos, bios, liens)
- `.context/BRIEF_VESUVE_AGENCY.md` — Expression de besoin complète

## 🎨 Couleurs artistes

| Artiste | Couleur |
|---------|---------|
| Nico Moreno | `#888888` |
| Pawlowski | `#FF0000` |
| ØTTA | `#00FFFF` |
| Under The Moon | `#00FF00` |
| MATRAKK | `#AAFF00` |
