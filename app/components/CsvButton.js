"use client"; // CsvButton.client.jsx
import { useContext } from "react";
import Image from "next/image";
import CartContext from "@/CartContext";
import { exportToCSV } from "@/utils/exportToCsv";

const CsvButton = () => {
  const { cart } = useContext(CartContext);

  const handleExport = () => {
    exportToCSV(cart.cartItems);
  };

  return (
    <button
      onClick={handleExport}
      disabled={cart?.cartItems?.length === 0}
      className="btn disabled:opacity-30 flex items-center gap-2 border border-[#C9C9C9] rounded-[8px] text-[14px] py-[9px] px-[17px] text-[#212121] flex-shrink-0"
    >
      Export as CSV
      <Image src="/csv.png" alt="csv" width={20} height={20} />
    </button>
  );
};

export default CsvButton;
