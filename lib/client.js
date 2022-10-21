import sanityClient from "@sanity/client";
import createImageUrlBuilder from "@sanity/image-url";
export const client = sanityClient({
  projectId: "2sf4a0yw",
  dataset: "production",
  apiVersion: "2011-11-17",
  useCdn: true,
  token: process.env.NEXT_APP_SANITY_tOKEN,
});

const builder = createImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
