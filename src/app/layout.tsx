import type { Metadata } from "next";
import { Raleway, Roboto_Condensed } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vesuveagency.com"),
  title: {
    default: "VESUVE AGENCY | Worldwide Talents Agency for Electronic Music",
    template: "%s | VESUVE AGENCY",
  },
  description:
    "Worldwide Talents Agency for Electronic Music. Booking and management for Nico Moreno, ØTTA, Pawlowski, MATRAKK, Under The Moon.",
  keywords: [
    "booking agency",
    "electronic music",
    "techno",
    "DJ booking",
    "artist management",
    "Nico Moreno booking",
    "ØTTA booking",
    "Pawlowski booking",
    "MATRAKK booking",
    "Under The Moon booking",
  ],
  authors: [{ name: "Vesuve Agency" }],
  creator: "Vesuve Agency",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vesuveagency.com",
    siteName: "VESUVE AGENCY",
    title: "VESUVE AGENCY | Worldwide Talents Agency for Electronic Music",
    description:
      "Worldwide Talents Agency for Electronic Music. Booking and management for top techno artists.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VESUVE AGENCY",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VESUVE AGENCY",
    description: "Worldwide Talents Agency for Electronic Music",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${robotoCondensed.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
