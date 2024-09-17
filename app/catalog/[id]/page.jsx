import { client } from "@/utils/sanity/_client";
import Product from "@/app/components/Product";
import AnnouncementBoard from "@/app/components/AnnouncementBoard";
import PdfButton from "@/app/components/PdfButton";
import CsvButton from "@/app/components/CsvButton";
import Header from "@/app/components/Header";
import CartButton from "@/app/components/CartButton";
import SelectCatalog from "@/app/components/SelectCatalog";
import SearchBar from "@/app/components/SearchBar";
import { Suspense } from "react";

const query = `*[_type == "catalog" && _id == $id] {
  _id,
  title,
  "products": products[active != false]->{
    _id,
    name,
    articleNumber,
    description,
    price,
    pricest,
    image,
    active,
    vikt,
  }
}`;
const catalogQuery = `*[_type == "catalog"]{
  _id,
  title,
}`;

const getCatalogById = async (id) => {
  const data = await client.fetch(query, { id }, { cache: "no-store" });
  return data[0];
};

export default async function Page({ params }) {
  const { id } = params;
  const catalog = await getCatalogById(id);
  const catalogs = await client.fetch(catalogQuery);

  return (
    <>
      <AnnouncementBoard text="SE VÅRA NYA PRODUKTER" link="" />
      <Header />
      <div className="px-4 mx-auto max-w-[1240px]">
        <div className="flex pt-4 flex-col md:flex-row justify-between">
          <div className="flex-1 flex items-center gap-2">
            <SelectCatalog active={catalog._id} catalogs={catalogs} />
            <SearchBar />
          </div>
          <div className="flex flex-1 flex-wrap md:flex-nowrap  md:justify-end gap-4 items-center py-[30px]">
            <CartButton />
            <PdfButton />
            <CsvButton />
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <div className=" gap-[16px] w-max mx-auto place-items-center grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {catalog.products
              ? catalog.products.map((product) => (
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
                ))
              : "No products Found"}
          </div>
        </Suspense>
      </div>
    </>
  );
}
