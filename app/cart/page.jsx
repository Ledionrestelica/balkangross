"use client";

import Image from "next/image";
import CartProduct from "../components/CartProduct";
import CartContext from "@/CartContext";
import { useContext } from "react";
import OrderForm from "../components/OrderForm";
import Link from "next/link";

const page = () => {
  const { cart } = useContext(CartContext);
  return (
    <div className="flex w-full min-h-[100vh]">
      <div className="flex-1 pt-[100px] flex justify-end overflow-y-scroll bg-secondary pl-[42px] pr-[68px]">
        {!cart?.cartItems?.length > 0 ? (
          <div className="w-full text-4xl flex flex-col items-center gap-5">
            Your cart is empty
            <Image
              src="/shopping.png"
              width={300}
              height={300}
              alt="cart"
            ></Image>
            <Link
              href="/"
              className="px-4 py-2 rounded-lg text-black text-sm bg-primary"
            >
              Go Back
            </Link>
          </div>
        ) : (
          <div className="flex-1 max-w-[506px]">
            <div className="text-[#A4ACB9] text-[14px] font-normal flex items-center gap-3">
              <p>Order #</p>
              <div>
                <Image
                  src="/logo.png"
                  width={40}
                  height={40}
                  alt="logo"
                  quality={100}
                />
              </div>
            </div>
            <div className="text-[#2A3640] text-[28px] mb-[24px] font-normal">
              You are ordering {cart?.cartItems?.length} products
            </div>
            <div className="flex flex-col gap-4 pb-10">
              {cart?.cartItems?.map((item) => (
                <CartProduct
                  key={item.product}
                  _id={item.product}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  artNum={item.articleNumber}
                  imgUrl={item.image}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 w-full flex flex-col py-[100px] px-[42px] ">
        <OrderForm />
      </div>
    </div>
  );
};

export default page;
