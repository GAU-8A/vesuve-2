import { defineField, defineType } from "sanity";

export default defineType({
  name: "artist",
  title: "Artist",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Artist Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Main Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photoHover",
      title: "Hover Photo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "type",
      title: "Artist Type",
      type: "string",
      options: {
        list: [
          { title: "DJ", value: "dj" },
          { title: "Live", value: "live" },
          { title: "DJ / Producer", value: "dj-producer" },
          { title: "Hybrid", value: "hybrid" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Agency Status",
      type: "string",
      options: {
        list: [
          { title: "Booking", value: "booking" },
          { title: "Management", value: "management" },
          { title: "Booking + Management", value: "both" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "genre",
      title: "Genre",
      type: "string",
      description: "e.g., Industrial Techno, Acid Techno, Hard Techno",
    }),
    defineField({
      name: "origin",
      title: "Origin / Location",
      type: "string",
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "spotifyArtistId",
      title: "Spotify Artist ID",
      type: "string",
      description: "The Spotify artist ID for embedding",
    }),
    defineField({
      name: "videos",
      title: "Videos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Video Title" },
            { name: "url", type: "url", title: "Video URL (YouTube/Vimeo)" },
          ],
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "instagram", type: "url", title: "Instagram" },
        { name: "soundcloud", type: "url", title: "SoundCloud" },
        { name: "spotify", type: "url", title: "Spotify" },
        { name: "bandcamp", type: "url", title: "Bandcamp" },
        { name: "residentAdvisor", type: "url", title: "Resident Advisor" },
        { name: "beatport", type: "url", title: "Beatport" },
        { name: "tiktok", type: "url", title: "TikTok" },
      ],
    }),
    defineField({
      name: "bookingEmail",
      title: "Booking Email",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "genre",
      media: "photo",
    },
  },
});
