import { client } from "@/utils/sanity/_client";

export const getProducts = async () => {
  "use server";
  const query = `*[_type == "featured"]{
    _id,
    title,
    "products": products[]->{
    _id,
    name,
    articleNumber,
    description,
    price,
    image,
    active,
    ean,
    vikt,
  }
  }`;
  const featured = await client.fetch(query);

  const products = featured.flatMap((item) => item.products);

  return products;
};
