import { groq } from "next-sanity";

// Artists
export const allArtistsQuery = groq`
  *[_type == "artist"] | order(order asc) {
    _id,
    name,
    slug,
    photo,
    photoHover,
    type,
    status,
    genre,
    origin,
    featured,
    order
  }
`;

export const featuredArtistsQuery = groq`
  *[_type == "artist" && featured == true] | order(order asc) {
    _id,
    name,
    slug,
    photo,
    photoHover,
    type,
    genre
  }
`;

export const artistBySlugQuery = groq`
  *[_type == "artist" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    photo,
    photoHover,
    type,
    status,
    genre,
    origin,
    bio,
    spotifyArtistId,
    videos,
    socialLinks,
    bookingEmail
  }
`;

export const artistSlugsQuery = groq`
  *[_type == "artist"] {
    "slug": slug.current
  }
`;

// Posts
export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    coverImage,
    excerpt,
    "artist": artist->{name, slug}
  }
`;

export const recentPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    publishedAt,
    coverImage,
    excerpt
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    coverImage,
    excerpt,
    body,
    tags,
    "artist": artist->{name, slug}
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post"] {
    "slug": slug.current
  }
`;

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    tagline,
    description,
    logo,
    ogImage,
    bookingEmail,
    socialLinks,
    address,
    newsletterEnabled,
    footerText,
    "featuredArtists": featuredArtists[]->{
      _id,
      name,
      slug,
      photo,
      photoHover,
      type,
      genre
    }
  }
`;
