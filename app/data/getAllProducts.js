const { revalidate } = require("../page");

const getAllProducts = async (page = 0, limit = 20) => {
  const start = page * limit;
  const query = `*[_type == "product"] | order(_createdAt desc) [${start}...${
    start + limit
  }] {
      _id,
      ean,
      articleNumber,
      active,
      name,
      image,
      price,
      vikt
    }`;
  const products = await client.fetch(query, { next: { revalidate: 3600 } });
  return products;
};
