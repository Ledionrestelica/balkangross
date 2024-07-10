"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CartContext from "@/CartContext";
import CartPDF from "@/utils/CartPDF";
import { useContext } from "react";
import Image from "next/image";

const PdfButton = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
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
