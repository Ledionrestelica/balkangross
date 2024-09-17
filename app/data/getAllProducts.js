const getAllProducts = async (page = 0, limit = 20) => {
  const start = page * limit;
  const query = `*[_type == "product" && active != false] | order(_createdAt desc) [${start}...${
    start + limit
  }] {
      _id,
      ean,
      articleNumber,
      active,
      name,
      image,
      price,
      pricest,
      vikt
    }`;
  const products = await client.fetch(query, { cache: "no-store" });
  return products;
};
