import imageUrlBuilder from "@sanity/image-url";
import { client } from "./_client";

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source).quality(50);
}
