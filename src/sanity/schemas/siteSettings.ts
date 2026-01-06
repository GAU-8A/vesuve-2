import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      initialValue: "VESUVE AGENCY",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      initialValue: "Worldwide Talents Agency for Electronic Music",
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "ogImage",
      title: "Default OG Image",
      type: "image",
      description: "Default image for social sharing",
    }),
    defineField({
      name: "featuredArtists",
      title: "Featured Artists on Homepage",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "artist" }],
        },
      ],
      description: "Select artists to feature on the homepage",
    }),
    defineField({
      name: "bookingEmail",
      title: "Booking Email",
      type: "string",
      initialValue: "info@vesuveagency.com",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "instagram", type: "url", title: "Instagram" },
        { name: "linkedin", type: "url", title: "LinkedIn" },
        { name: "twitter", type: "url", title: "Twitter/X" },
        { name: "facebook", type: "url", title: "Facebook" },
      ],
    }),
    defineField({
      name: "address",
      title: "Office Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "newsletterEnabled",
      title: "Enable Newsletter",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
