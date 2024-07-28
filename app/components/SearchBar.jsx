"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [focus, setFocus] = useState(false);

  // Load products from JSON file
  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  // Debounce the search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 0.5 second debounce time

    // Cleanup function to clear the timeout if searchTerm changes
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Filter products based on the debounced search term
  useEffect(() => {
    if (debouncedSearchTerm) {
      const lowercasedTerm = debouncedSearchTerm.toLowerCase();
      const filtered = products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(lowercasedTerm) ||
            (product.articleNumber &&
              product.articleNumber.toLowerCase().includes(lowercasedTerm)) ||
            (product.ean && product.ean.toString().includes(lowercasedTerm))
        )
        .slice(0, 20);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]); // Clear filtered products if search term is empty
    }
  }, [debouncedSearchTerm, products]);

  return (
    <div className="w-full">
      <input
        type="text"
        className="w-full relative border border-[#E9E9E9] text-[14px] text-[#4d4d4d] outline-none p-2.5 rounded-[8px] placeholder:text-[#848484] placeholder:text-[14px]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Sök"
        onFocus={() => setFocus(true)}
        onBlur={() => setTimeout(() => setFocus(false), 100)}
      />
      {focus && filteredProducts.length > 0 && (
        <div className="relative">
          <div className="absolute bg-white top-0 w-full  rounded-[8px] z-10">
            {filteredProducts.map((product) => (
              <Link href={`/product/${product._id}`} key={product._id}>
                <div className="py-3 px-4  border border-t-[#E9E9E9] cursor-pointer hover:bg-[#E9E9E9]">
                  <h3>{product.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
