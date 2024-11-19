import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Title",
      description: "The title of the product",
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: "slug",
      name: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      type: "string",
      name: "description",
      title: "Description",
      description: "The description of the product",
    }),
    defineField({
      type: "image",
      name: "image",
      title: "Image",
      description: "The image for the product",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      type: "array",
      name: "category",
      title: "Category",
      description: "The category for the product",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: "number",
      name: "price",
      title: "Price",
      description: "The price of the product",
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: "number",
      name: "rowprice",
      title: "Row price",
    }),
    defineField({
      type: "number",
      name: "ratings",
      title: "Ratings",
      description: "Ratings must be equal to or less than 5",
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: "boolean",
      name: "isnew",
      title: "New Arrival",
    }),
    defineField({
      type: "string",
      name: "position",
      title: "Position",
    }),
    defineField({
      type: "string",
      name: "brand",
      title: "Brand",
    }),
    defineField({
      type: "number",
      name: "quantity",
      title: "Quantity",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      position: "position",
    },
  },
});
