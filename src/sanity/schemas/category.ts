import { defineField, defineType } from "sanity";

export default defineType({
  type: "document",
  name: "category",
  title: "Category",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "description",
      type: "string",
      title: "Description",
    }),
    defineField({
      type: "image",
      name: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
    }),
  ],
});