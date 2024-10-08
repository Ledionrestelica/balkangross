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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const getAllProducts = async (page = 0, limit = 20) => {
  const start = page * limit;
  const query = `*[_type == "product" && active != false] | order(_createdAt desc) [${start}...${
    start + limit
  }] {
    _id,
    ean,
    pricest,
    articleNumber,
    active,
    name,
    image,
    vikt
  }`;
  const products = await client.fetch(query, { cache: "no-store" });
  return products;
};

const getTotalProductCount = async () => {
  const query = `count(*[_type == "product" && active != false])`;
  return await client.fetch(query, { cache: "no-store" });
};

const catalogquery = `*[_type == "catalog"]{
    _id,
    title,
  }`;

const page = async ({ searchParams }) => {
  const pageNumber = parseInt(searchParams.page) || 1;
  const limit = 20;
  const catalogs = await client.fetch(catalogquery);
  const products = await getAllProducts(pageNumber - 1, limit);
  const totalProducts = await getTotalProductCount();
  const totalPages = Math.ceil(totalProducts / limit);

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
        <ProductsSection
          products={products}
          page={pageNumber}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};

const ProductsSection = ({ products, page, totalPages }) => {
  const showEllipsis = totalPages > 5;
  const pageNumbers = [];

  if (showEllipsis) {
    if (page <= 3) {
      pageNumbers.push(1, 2, 3, 4, 5);
    } else if (page >= totalPages - 2) {
      pageNumbers.push(
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pageNumbers.push(page - 2, page - 1, page, page + 1, page + 2);
    }
  } else {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  }

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
        <Pagination className="border border-secondary w-max rounded-md p-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href={page > 1 ? `?page=${page - 1}` : "#"} />
            </PaginationItem>
            {showEllipsis && page > 3 && (
              <>
                <PaginationItem>
                  <PaginationLink href="?page=1">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}
            {pageNumbers.map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href={`?page=${pageNum}`}
                  isActive={pageNum === page}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}
            {showEllipsis && page < totalPages - 2 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href={`?page=${totalPages}`}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <PaginationNext
                href={page < totalPages ? `?page=${page + 1}` : "#"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default page;
