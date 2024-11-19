import { defineField, defineType } from "sanity";

export default defineType({
  name: "banner",
  title: "Banner",
  type: "document",
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Title",
      description: "The title of the banner",
      validation: (rule) => rule.required()
    }),
    defineField({
      type: "string",
      name: "subtitle",
      title: "Subtitle",
      description: "The subtitle of the banner",
    }),
    defineField({
      type: "number",
      name: "price",
      title: "Price",
      description: "The price of the banner",
      validation: (rule) => rule.required()
    }),
    defineField({
      type: "string",
      name: "description",
      title: "Description",
      description: "The description of the banner",
    }),
    defineField({
        type: "image",
      name: "image",
      title: "Image",
      description: "The image for the banner",
      options: {
        hotspot: true,
      },
      validation: (rule)=>rule.required(),
      preview:{
        select:{
            imageUrl: "asset.url",
            title: "caption"
        }
      }
    })
  ],
});