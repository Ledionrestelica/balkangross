"use client";

import { useContext } from "react";
import Link from "next/link";
import CartContext from "@/CartContext";

const CartButton = () => {
  const { cart } = useContext(CartContext);
  const isDisabled = cart?.cartItems?.length === 0;

  return (
    <button className=" disabled:opacity-30" disabled={isDisabled}>
      <Link
        className={`${
          cart?.cartItems?.length === 0 ? "pointer-events-none" : ""
        }`}
        href="/cart"
      >
        <div className="w-max px-3 flex items-center h-[43px] text-[14px] bg-primary  rounded-[8px] cursor-pointer ">
          Slutför Beställning ({cart?.cartItems?.length || 0})
        </div>
      </Link>
    </button>
  );
};

export default CartButton;
