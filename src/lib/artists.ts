// Artist data - will be replaced with Sanity CMS
export interface Artist {
  name: string;
  slug: string;
  photo: string;
  photoHover?: string;
  color: string;
  genre: string;
  bio: string;
  socials: {
    instagram?: string;
    facebook?: string;
    soundcloud?: string;
    spotify?: string;
    bandcamp?: string;
    beatport?: string;
    residentAdvisor?: string;
  };
  label?: {
    name: string;
    url?: string;
  };
  spotifyArtistId?: string;
}

export const artists: Artist[] = [
  {
    name: "NICO MORENO",
    slug: "nico-moreno",
    photo: "https://vesuveagency.com/wp-content/uploads/2024/06/Nico-2-scaled.jpeg",
    photoHover: "https://vesuveagency.com/wp-content/uploads/2024/06/Nico-performing.png",
    color: "#888888",
    genre: "Industrial Techno",
    bio: "Nico Moreno is a French DJ and producer from Caen, recognized as one of the major players in the contemporary industrial techno rave scene. He began producing music at a young age, creating intense music characterized by fast, hard-hitting kicks.\n\nNico Moreno quickly made himself known thanks to songs which all met with resounding success, leaving his mark on the techno scene. Titles such as \"Purple Widow,\" \"Insolent Rave,\" \"Techno Crari,\" \"Your Bad Company,\" \"This is for my haters,\" among many others, have all enjoyed dazzling success.\n\nHis music has been played by major artists including Amelie Lens and Charlotte De Witte. In 2024, he released his album \"You Can't Stop The Movement\" cementing his position as a leading figure in the industrial techno scene.",
    socials: {
      instagram: "https://www.instagram.com/nicomoreno_music/",
      facebook: "https://www.facebook.com/nicomorenomusic",
      soundcloud: "https://soundcloud.com/nicomorenomusic",
      spotify: "https://open.spotify.com/artist/4qNnBaKNfJDLfXgHLJ4kYD",
    },
    label: {
      name: "Insolent Rave Records",
      url: "https://www.instagram.com/insolentrave_records/",
    },
    spotifyArtistId: "4qNnBaKNfJDLfXgHLJ4kYD",
  },
  {
    name: "PAWLOWSKI",
    slug: "pawlowski",
    photo: "https://vesuveagency.com/wp-content/uploads/2024/06/Pawlo-4-scaled-e1718199223772.jpeg",
    photoHover: "https://vesuveagency.com/wp-content/uploads/2024/06/Pawlo-5.png",
    color: "#FF0000",
    genre: "Acid Techno / 90s Rave",
    bio: "Pawlowski is a French producer and DJ known for his unique approach to electronic music. His productions are inspired by Akira and Evangelion, blending 90s rave and Acid Techno into a distinctive sound.\n\nWith hypnotic acid lines, powerful kicks, and catchy melodies, he creates collective trance experiences in clubs. His sets are journeys through pounding 303 basslines, relentless kicks, and hypnotic synthesizer work that keeps dancefloors moving until sunrise.\n\nIn 2023, he signed with KNTXT and released the EP \"Final Outsider\". In October 2024, he dropped \"Back with Another One\" feat. Fenrick. With over 115K followers on Instagram, Pawlowski has become a rising force in the acid techno scene.",
    socials: {
      instagram: "https://www.instagram.com/pawlowski.music/",
      soundcloud: "https://soundcloud.com/pawlowski",
      bandcamp: "https://pawlowskidj.bandcamp.com/",
      beatport: "https://www.beatport.com/artist/pawlowski/685889",
      residentAdvisor: "https://ra.co/dj/pawlowski",
    },
    label: {
      name: "KNTXT",
      url: "https://www.instagram.com/kntxt/",
    },
  },
  {
    name: "ØTTA",
    slug: "otta",
    photo: "https://vesuveagency.com/wp-content/uploads/2024/04/otta_press-0-scaled-e1717593036363.jpg",
    photoHover: "https://vesuveagency.com/wp-content/uploads/2024/04/1-scaled.jpg",
    color: "#00FFFF",
    genre: "Hard Techno / Distorted Techno / Gabber",
    bio: "ØTTA (Carlota Correia Neves) is a Portuguese producer and DJ based in London. Co-founder of the collective and event series Орфей [Orpheus], she brings raw energy of gabber and hard techno to a new generation.\n\nA former orchestra member with 6 years of viola in Lisbon, her classical background forms the foundation of her sonic signature — a marriage of emotional depth with raw industrial noise, gabber, and rave classics. The name ØTTA means \"fear\" in Icelandic.\n\nHer productions have become staples in the sets of major DJs worldwide. Featured on Spotify's \"Women of Electronic\" cover, she completed her first Asia tour in 2024 and released the EP \"In My 2024 Era\".",
    socials: {
      instagram: "https://www.instagram.com/ottaottie/",
      soundcloud: "https://soundcloud.com/ottaottie",
      spotify: "https://open.spotify.com/artist/example",
    },
  },
  {
    name: "UNDER THE MOON",
    slug: "under-the-moon",
    photo: "https://vesuveagency.com/wp-content/uploads/2024/06/Numerique_SamuelNogues_003-scaled.jpg",
    photoHover: "https://vesuveagency.com/wp-content/uploads/2024/06/Warren3.png",
    color: "#00FF00",
    genre: "Dark Techno / Acid / Hardtrance",
    bio: "Under The Moon is a French artist who began his musical journey at 16, illuminating the dancefloors of northern France. Immersed in underground culture since childhood, his sets are a sonic odyssey exploring various realms of Techno.\n\nHis sound gradually transitions from dark techno to acid, then increases BPM towards the territories of Hardtechno and Hardtrance/Hardance. His music evokes the mystical energy of late-night raves, where pulsating rhythms and ethereal pads transport listeners to another dimension.\n\nJoining Vesuve Agency in January 2023, he has since performed in Europe's most exclusive clubs. In 2024, he released \"It's Time to Be Under the Moon\" and \"Mi Amor\".",
    socials: {
      instagram: "https://www.instagram.com/underthemoon_music/",
      soundcloud: "https://soundcloud.com/underthemoon000",
      bandcamp: "https://underthemoonmusic.bandcamp.com/",
      beatport: "https://www.beatport.com/artist/under-the-moon/703233",
    },
  },
  {
    name: "MATRAKK",
    slug: "matrakk",
    photo: "https://vesuveagency.com/wp-content/uploads/2024/11/PHOTO-2024-11-21-17-18-44-1.jpg",
    photoHover: "https://vesuveagency.com/wp-content/uploads/2024/11/MATRAKK-3.png",
    color: "#AAFF00",
    genre: "Hard Techno / Trance",
    bio: "MATRAKK is an eclectic electronic artist from Lyon, blending techno and trance. Leader of Obsession alongside Rorganic, he started DJing in high school in a generalist style, even hosting weddings. Meanwhile, he discovered industrial techno in Lyon's iconic venues.\n\nHis particular style combines energetic techno with a heavy atmosphere and retro synths. Combining the relentless drive of techno with the euphoric elements of trance, MATRAKK creates a unique sound that resonates with ravers across the globe.\n\nKey releases include \"My Drums Hard\" (2020), \"Mon Amour\" (2022), \"Contre-Sens 2\", \"Space Invaders\" on Blackworks, \"Romance Under The Sun\" (2024), and \"UN POCO\" on 240kmh (2025). With 52K Instagram followers, he continues to grow as an ambassador of 90s rave culture worldwide.",
    socials: {
      instagram: "https://www.instagram.com/matrakk___/",
      facebook: "https://www.facebook.com/matrakk",
      soundcloud: "https://soundcloud.com/matrakk",
      beatport: "https://www.beatport.com/artist/matrakk/852121",
      residentAdvisor: "https://ra.co/dj/matrakk",
    },
    label: {
      name: "Blackworks / 240kmh",
    },
  },
];

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}

export function getAllArtistSlugs(): string[] {
  return artists.map((a) => a.slug);
}
