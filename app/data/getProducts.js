import { client } from "@/utils/sanity/_client";

export const getProducts = async () => {
  const query = `*[_type == "product"] | order(_createdAt desc) [0...50]`;
  const products = await client.fetch(query, { cache: "no-store" });
  return products;
};
