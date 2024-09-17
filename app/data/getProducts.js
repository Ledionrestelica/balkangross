import { client } from "@/utils/sanity/_client"; // for only featured products

export const getProducts = async () => {
  "use server";
  const query = `*[_type == "featured"]{
    _id,
    title,
    "products": products[active != false]->{
    _id,
    name,
    articleNumber,
    description,
    pricest,
    image,
    active,
    ean,
    vikt,
  }
  }`;
  const featured = await client.fetch(query, { cache: "no-store" });

  const products = featured.flatMap((item) => item.products);

  return products;
};
