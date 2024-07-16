import { client } from "@/utils/sanity/_client";

export const getProducts = async () => {
  "use server";
  const query = `*[_type == "product"] | order(_createdAt desc) [0...50]`;
  const products = await client.fetch(query);
  return products;
};
