import { notFound } from "next/navigation";
import { getArtistBySlug, getAllArtistSlugs } from "@/lib/artists";
import ArtistDetailClient from "@/components/artists/ArtistDetailClient";

interface ArtistPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllArtistSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArtistPageProps) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);

  if (!artist) {
    return { title: "Artist Not Found" };
  }

  return {
    title: `${artist.name} Booking`,
    description: `Book ${artist.name} - ${artist.genre}. ${artist.bio.substring(0, 140)}...`,
    openGraph: {
      title: `${artist.name} Booking | VESUVE AGENCY`,
      description: `Book ${artist.name} - ${artist.genre}. Contact Vesuve Agency for booking inquiries.`,
      images: [artist.photo],
    },
  };
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);

  if (!artist) {
    notFound();
  }

  return <ArtistDetailClient artist={artist} />;
}
