import { client } from "@/utils/sanity/_client";

export const getProducts = async () => {
  const query = `*[_type == "product"] | order(_createdAt desc) [0...10]{
  _id,
    name,
    articleNumber,
      ean,
      active,
      price,
}
`;
  const products = await client.fetch(query);
  return products;
};
