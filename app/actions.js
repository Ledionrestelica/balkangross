"use server";

import { client } from "@/utils/sanity/_client";

export async function getProduct(id) {
  try {
    const res = await client.fetch(
      `*[_type == "product" && _id == $id]{
        _id,
  name,
  price,
  active,
  ean,
  articleNumber,
  image,
  pricest,
  "brand": brand->{
      title,
    }
      }`,
      { id },
      { next: { revalidate: 1300 } }
    );
    return res;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}
