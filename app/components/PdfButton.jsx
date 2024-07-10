"use client";
// components/PdfButton.jsx
import React, { useContext } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CartContext from "@/CartContext"; // Adjust the path as per your project structure
import CartPDF from "@/utils/CartPDF"; // Adjust the path as per your project structure
import Image from "next/image";

const PdfButton = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <PDFDownloadLink
        document={<CartPDF cartItems={cart?.cartItems} />}
        fileName="cart.pdf"
      >
        {({ loading }) => (
          <button
            disabled={cart?.cartItems?.length === 0 || loading}
            className="btn disabled:opacity-30 flex items-center gap-2 border border-[#C9C9C9] rounded-[8px] text-[14px] py-[7px] px-[17px] text-[#212121]"
          >
            {loading ? "Generating PDF..." : "Export as PDF"}
            <Image src="/pdf.png" alt="pdf" width={20} height={20} />
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default PdfButton;
