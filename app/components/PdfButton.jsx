"use client";
// components/PdfButton.jsx
import React, { useContext } from "react";
import dynamic from "next/dynamic";

import CartContext from "@/CartContext";
import CartPDF from "@/utils/CartPDF";
import Image from "next/image";

const PdfButton = () => {
  const { cart } = useContext(CartContext);
  const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => (
        <p className="btn disabled:opacity-30 flex items-center gap-2 border border-[#C9C9C9] rounded-[8px] text-[14px] py-[7px] px-[17px] text-[#212121]">
          Export as PDF
          <Image src="/pdf.png" alt="pdf" width={20} height={20} />
        </p>
      ),
    }
  );

  return (
    <div className="flex-shrink-0">
      <PDFDownloadLink
        document={<CartPDF cartItems={cart?.cartItems} />}
        fileName="cart.pdf"
      >
        <button
          disabled={cart?.cartItems?.length === 0}
          className="btn disabled:opacity-30 flex items-center gap-2 border border-[#C9C9C9] rounded-[8px] text-[14px] py-[7px] px-[17px] text-[#212121]"
        >
          Export as PDF
          <Image src="/pdf.png" alt="pdf" width={20} height={20} />
        </button>
      </PDFDownloadLink>
    </div>
  );
};

export default PdfButton;
