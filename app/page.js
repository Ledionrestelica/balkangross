import Product from "./components/Product";
import AnnouncementBoard from "./components/AnnouncementBoard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { getProducts } from "./data/getProducts";
import CartButton from "./components/CartButton";
import PdfButton from "./components/PdfButton";
import CsvButton from "./components/CsvButton";
import SelectCatalog from "./components/SelectCatalog";
import { client } from "@/utils/sanity/_client";
import SearchBar from "./components/SearchBar";
import { Suspense } from "react";

const query = `*[_type == "catalog"]{
  _id,
  title,
}`;
export const metadata = {
  title: "Home",
};

export default async function Home() {
  const catalogs = await client.fetch(query);
  const products = await getProducts();

  return (
    <>
      <AnnouncementBoard text="SE VÅRA NYA PRODUKTER" link="" />
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

        <div className="gap-[16px] w-max mx-auto place-items-center grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          <Suspense fallback={<div>Loading...</div>}></Suspense>
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
      </div>
    </>
  );
}

export const revalidate = 600;
