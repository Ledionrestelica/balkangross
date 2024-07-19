"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SelectCatalog = ({ catalogs }) => {
  const router = useRouter();
  const [selectedCatalog, setSelectedCatalog] = useState("default");

  const handleChange = (event) => {
    const catalogId = event.target.value;
    setSelectedCatalog(catalogId);
    if (catalogId !== "default") {
      router.push(`/catalog/${catalogId}`);
    }
  };

  return (
    <div>
      <select
        name="select-catalog"
        id="selectcatalog"
        onChange={handleChange}
        value={selectedCatalog}
        className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="default" name="default" key="default">
          Vänligen Välj Kategori
        </option>
        {catalogs.map((item) => (
          <option key={item._id} value={item._id} name={item.title}>
            {item.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCatalog;
