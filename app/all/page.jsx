import Product from "../components/Product";
import AnnouncementBoard from "../components/AnnouncementBoard";
import Header from "../components/Header";
import CartButton from "../components/CartButton";
import PdfButton from "../components/PdfButton";
import CsvButton from "../components/CsvButton";
import SelectCatalog from "../components/SelectCatalog";
import { client } from "@/utils/sanity/_client";
import SearchBar from "../components/SearchBar";
import Link from "next/link";
import next from "next";
import { revalidate } from "../page";

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
    pricest,
    vikt
  }`;
  const products = await client.fetch(query, { cache: "no-store" });
  return products;
};

const catalogquery = `*[_type == "catalog"]{
    _id,
    title,
  }`;

const page = async ({ searchParams }) => {
  const pageNumber = parseInt(searchParams.page) || 0; // Default to 0 if page param is not set
  const catalogs = await client.fetch(catalogquery);
  const products = await getAllProducts(pageNumber);

  return (
    <>
      <AnnouncementBoard text="SE VARÅ NYA PRODUKTER" link="" />
      <Header />
      <div className="px-4 mx-auto max-w-[1240px]">
        <div className="flex pt-4 flex-col md:flex-row justify-between">
          <div className="flex-1 flex items-center gap-2">
            <SelectCatalog catalogs={catalogs} />
            <SearchBar />
          </div>
          <div className="flex flex-1 flex-wrap md:flex-nowrap  md:justify-end gap-4 items-center py-[30px]">
            <CartButton />
            <PdfButton />
            <CsvButton />
          </div>
        </div>
        <ProductsSection products={products} page={pageNumber} />
      </div>
    </>
  );
};

const ProductsSection = ({ products, page }) => {
  return (
    <>
      <div className="gap-[16px] w-max mx-auto place-items-center grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {products.map((product) => (
          <Product
            key={product._id}
            _id={product._id}
            ean={product.ean}
            artNum={product.articleNumber}
            active={product.active}
            name={product.name}
            price={product.pricest}
            imgUrl={
              product.image && product.image.asset
                ? product.image.asset._ref
                : null
            }
            vikt={product.vikt}
          />
        ))}
      </div>
      <div className="text-center py-4">
        <Link href={`?page=${page + 1}`}>
          <button className="btn">Show More</button>
        </Link>
      </div>
    </>
  );
};

export default page;
