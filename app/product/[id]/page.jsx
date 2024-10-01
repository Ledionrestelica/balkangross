import { client } from "@/utils/sanity/_client";
import SingleProduct from "@/app/components/SingleProduct";
import Link from "next/link";
import PdfButton from "@/app/components/PdfButton";
import CsvButton from "@/app/components/CsvButton";
import CartButton from "@/app/components/CartButton";
import AnnouncementBoard from "@/app/components/AnnouncementBoard";

const productQuery = `*[_type == "product" && _id == $id]{
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
      
}[0]`;
export const metadata = {
  title: "Product",
};

export default async function Page({ params }) {
  const { id } = params;

  const product = await client.fetch(
    productQuery,
    { id },
    { cache: "no-store" }
  );

  return (
    <>
      <AnnouncementBoard text="SE VÅRA NYA PRODUKTER" link="/" />
      <div className="max-w-[1240px] mt-[50px] px-4 mx-auto md:container  min-h-[100vh]">
        <div className="w-full mb-[20px] gap-6 flex md:flex-row flex-col justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-[14px] text-[#6f6f6f]">
              Home
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="10"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M1.2 8.6L4.8 5 1.2 1.4"
              ></path>
            </svg>
            <div>{product.name}</div>
          </div>
          <div className="flex gap-4 md:flex-nowrap flex-wrap  ">
            <CartButton />
            <PdfButton />
            <CsvButton />
          </div>
        </div>
        <SingleProduct
          _id={product._id}
          name={product.name}
          price={product.price}
          active={product.active}
          artNum={product.articleNumber}
          imgUrl={
            product.image && product.image.asset
              ? product.image.asset._ref
              : null
          }
          brand={product.brand ? product.brand.title : "No brand Available"}
          pricest={product.pricest ? product.pricest : ""}
        />
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const pathsQuery = `*[_type == "product"]{
    _id
  }`;
  const products = await client.fetch(pathsQuery);

  return products.map((product) => ({
    id: product._id,
  }));
}

export const revalidate = 60 * 60;

export const dynmic = true;
