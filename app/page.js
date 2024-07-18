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

const query = `*[_type == "catalog"]{
  _id,
  title,
}`;

export default async function Home() {
  const catalogs = await client.fetch(query);
  const products = await getProducts();

  return (
    <>
      <AnnouncementBoard text="New Products just launched" link="" />
      <Header />
      <div className="px-4 mx-auto max-w-[1240px]">
        <div className="flex justify-between">
          <div className="flex-1 flex items-center">
            <SelectCatalog catalogs={catalogs} />
          </div>
          <div className="flex flex-1 justify-end gap-4 items-center py-[30px]">
            <CartButton />
            <PdfButton />
            <CsvButton />
          </div>
        </div>

        <div className=" gap-[16px] w-max mx-auto place-items-center grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {products.map((product) => (
            <Product
              key={product._id}
              _id={product._id}
              ean={product.ean}
              artNum={product.articleNumber}
              active={product.active}
              name={product.name}
              price={product.price}
              imgUrl={
                product.image && product.image.asset
                  ? product.image.asset._ref
                  : null
              }
              vikt={product.vikt}
            />
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
}

export const revalidate = 600;
