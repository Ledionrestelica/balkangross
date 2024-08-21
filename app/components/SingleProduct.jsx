"use client";

import { useContext } from "react";
import CartContext from "@/CartContext";
import Image from "next/image";
import { urlFor } from "@/utils/sanity/_imageBuilder";

const SingleProduct = ({ _id, name, artNum, active, price, imgUrl, brand }) => {
  const { cart, addItemToCart, deleteItemFromCart } = useContext(CartContext);
  const cartItem = cart?.cartItems?.find((item) => item.product === _id);
  const increaseQty = (cartItem) => {
    const newQty = cartItem?.quantity + 1;
    const item = { ...cartItem, quantity: newQty };

    addItemToCart(item);
  };

  const decreaseQty = (cartItem) => {
    const newQty = cartItem?.quantity - 1;
    const item = { ...cartItem, quantity: newQty };

    if (newQty === 0) {
      deleteItemFromCart(cartItem?.product);
      return;
    }

    addItemToCart(item);
  };

  const addToCartHandler = () => {
    addItemToCart({
      product: _id,
      name: name,
      price: price,
      articleNumber: artNum,
      image: imgUrl ? urlFor(imgUrl).url() : null,
    });
  };

  return (
    <>
      <div key={_id} className="w-full mb-6 flex md:flex-row flex-col">
        <div className="flex-1 md:pr-[30px]">
          <div className=" md:w-full h-[60vh] flex items-center justify-center relative w-full aspect-square border borded-[#E7E7E7] rounded-[8px] ">
            {imgUrl ? (
              <Image
                fill
                alt="product"
                objectFit="contain"
                src={urlFor(imgUrl).url()}
              ></Image>
            ) : (
              <p>No image available</p>
            )}
          </div>
        </div>
        <div className="flex-1 mt-[50px] flex flex-col gap-[30px] md:pl-[30px]">
          <div className="flex flex-col gap-[12px]">
            <p className="text-[32px] font-semibold text-[#040300]">{name}</p>
            <div className="flex justify-between flex-wrap gap-2">
              <p className="text-[18px] font-normal text-[#585858]">
                Art nr:{" "}
                <span className="font-bold text-[18px] text-[#585858]">
                  {artNum}
                </span>
              </p>
              <p className="flex items-center gap-1 font-light text-[16px] text-[#585858]">
                Lagerstatus:
                {active ? (
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                  </span>
                ) : (
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-700"></span>
                  </span>
                )}
              </p>
              <p className="text-[18px] font-normal text-[#585858]">
                Pris/k:{" "}
                <span className="font-bold text-[18px] text-[#585858]">
                  {price} kr
                </span>
              </p>
            </div>
            <div className="flex justify-between flex-wrap gap-4">
              <p className="text-[18px] font-normal text-[#585858]">
                Brand:{" "}
                <span className="font-bold text-[18px] text-[#585858]">
                  {brand}
                </span>
              </p>
              <p className="text-[18px] font-normal text-[#585858]">
                Pris/st:{" "}
              </p>
            </div>
          </div>
          {cartItem ? (
            <div
              className="rounded-[8px] border border-[#E0E0E0] h-[42.5px] font-normal
            text-[15px] text-[#585858]  flex justify-between items-center"
            >
              <button
                onClick={() => decreaseQty(cartItem)}
                className="w-[50px] rounded-[8px] h-full text-white bg-slate-600"
              >
                -
              </button>
              <span>{cartItem.quantity}</span>
              <button
                onClick={() => increaseQty(cartItem)}
                className="w-[50px] rounded-[8px] h-full text-white bg-slate-600"
              >
                +
              </button>
            </div>
          ) : null}

          <button
            onClick={addToCartHandler}
            className="w-full bg-primary flex items-center justify-center text-black text-[18px] border border-[#E0E0E0] rounded-[8px] py-[14px]"
          >
            {cartItem ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              "Lägg Till Produkt"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
