// app/[id]/page.jsx
import { client } from "@/utils/sanity/_client";
import Product from "@/app/components/Product";
import AnnouncementBoard from "@/app/components/AnnouncementBoard";
import PdfButton from "@/app/components/PdfButton";
import CsvButton from "@/app/components/CsvButton";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import CartButton from "@/app/components/CartButton";
import SelectCatalog from "@/app/components/SelectCatalog";

const query = `*[_type == "catalog" && _id == $id] {
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
    vikt,
  }
}`;
const catalogQuery = `*[_type == "catalog"]{
  _id,
  title,
}`;

const getCatalogById = async (id) => {
  const data = await client.fetch(query, { id });
  return data[0]; // Assuming you get an array and you need the first item
};

export default async function Page({ params }) {
  const { id } = params;
  const catalog = await getCatalogById(id);
  const catalogs = await client.fetch(catalogQuery);

  return (
    <>
      <AnnouncementBoard text="New Products just launched" link="" />
      <Header />
      <div className="px-4 mx-auto max-w-[1240px]">
        <div className="flex justify-between">
          <div className="flex items-center">
            <SelectCatalog catalogs={catalogs} />
          </div>
          <div className="flex flex-1 justify-end gap-4 items-center py-[30px]">
            <CartButton />
            <PdfButton />
            <CsvButton />
          </div>
        </div>

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
                  price={product.price}
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
      </div>
    </>
  );
}
