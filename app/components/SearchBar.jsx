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
    }, 500); // 1 second debounce time

    // Cleanup function to clear the timeout if searchTerm changes
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Filter products based on the debounced search term
  useEffect(() => {
    if (debouncedSearchTerm) {
      const filtered = products
        .filter((product) =>
          product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
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
          <div className="absolute bg-[#E9E9E9] top-0 w-full border border-[#E9E9E9] rounded-[8px] z-10">
            {filteredProducts.map((product) => (
              <Link href={`/product/${product._id}`}>
                <div
                  className="py-3 px-4 cursor-pointer hover:bg-white"
                  key={product._id}
                >
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
