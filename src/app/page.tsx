import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ArtistCard from "@/components/artists/ArtistCard";

// Temporary static data - will be replaced with Sanity data
const artists = [
  {
    name: "Nico Moreno",
    slug: "nico-moreno",
    photo: "https://vesuveagency.com/wp-content/uploads/2024/06/Nico-2-scaled.jpeg",
    photoHover: "https://vesuveagency.com/wp-content/uploads/2024/06/Nico-performing.png",
    genre: "Industrial Techno",
  },
  {
    name: "Pawlowski",
    slug: "pawlowski",
    photo: "https://vesuveagency.com/wp-content/uploads/2024/06/Pawlo-4-scaled-e1718199223772.jpeg",
    photoHover: "https://vesuveagency.com/wp-content/uploads/2024/06/Pawlo-5.png",
    genre: "Acid Techno / 90s Rave",
  },
  {
    name: "ØTTA",
    slug: "otta",
    photo: "https://vesuveagency.com/wp-content/uploads/2024/04/otta_press-0-scaled-e1717593036363.jpg",
    photoHover: "https://vesuveagency.com/wp-content/uploads/2024/04/1-scaled.jpg",
    genre: "Hard Techno / Gabber",
  },
  {
    name: "Under The Moon",
    slug: "under-the-moon",
    photo: "https://vesuveagency.com/wp-content/uploads/2024/06/Numerique_SamuelNogues_003-scaled.jpg",
    photoHover: "https://vesuveagency.com/wp-content/uploads/2024/06/Warren3.png",
    genre: "Dark Techno / Hardtrance",
  },
  {
    name: "MATRAKK",
    slug: "matrakk",
    photo: "https://vesuveagency.com/wp-content/uploads/2024/11/PHOTO-2024-11-21-17-18-44-1.jpg",
    photoHover: "https://vesuveagency.com/wp-content/uploads/2024/11/MATRAKK-3.png",
    genre: "Hard Techno / Trance",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="pt-24 pb-12 px-6 md:px-12">
        {/* Hero Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-sm font-medium tracking-[0.3em] uppercase opacity-50 mb-4">
            Artist Roster
          </h2>
        </section>

        {/* Artists Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
          {artists.map((artist) => (
            <ArtistCard
              key={artist.slug}
              name={artist.name}
              slug={artist.slug}
              photo={artist.photo}
              photoHover={artist.photoHover}
              genre={artist.genre}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
