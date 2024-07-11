"use client";

import { useContext } from "react";
import CartContext from "@/CartContext";
import Image from "next/image";
import { urlFor } from "@/utils/sanity/_imageBuilder";

const SingleProduct = ({ _id, name, artNum, active, price, imgUrl }) => {
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
      image: urlFor(imgUrl),
    });
  };

  return (
    <>
      <div key={_id} className="w-full flex md:flex-row flex-col">
        <div className="flex-1  pr-[30px]">
          <div className="md:w-full flex items-center justify-center relative w-1/2 aspect-square border borded-[#E7E7E7] rounded-[8px] ">
            {imgUrl ? (
              <img src={urlFor(imgUrl).width(50).url()}></img>
            ) : (
              <p>No image available</p>
            )}
          </div>
        </div>
        <div className="flex-1 mt-[50px] flex flex-col gap-[30px] pl-[30px]">
          <div className="flex flex-col gap-[12px]">
            <p className="text-[32px] font-semibold text-[#040300]">{name}</p>
            <div className="flex justify-between">
              <p className="text-[18px] font-normal text-[#585858]">
                Art nr:{" "}
                <span className="font-bold text-[18px] text-[#585858]">
                  {artNum}
                </span>
              </p>
              <p className="flex items-center gap-1 font-light text-[16px] text-[#585858]">
                Stock:
                {active ? (
                  <span class="relative flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                  </span>
                ) : (
                  <span class="relative flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-red-700"></span>
                  </span>
                )}
              </p>
              <p className="text-[18px] font-normal text-[#585858]">
                price:{" "}
                <span className="font-bold text-[18px] text-[#585858]">
                  {price}
                </span>
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
            className="w-full bg-primary text-black text-[18px] border border-[#E0E0E0] rounded-[8px] py-[14px]"
          >
            {cartItem ? "Added!" : "Add product"}
          </button>
          <div className="flex flex-col gap-2">
            <div className="w-full px-[12px]  text-black text-[18px] border border-[#E0E0E0] rounded-[8px] py-[14px]">
              shipping info
            </div>
            <div className="w-full px-[12px]  text-black text-[18px] border border-[#E0E0E0] rounded-[8px] py-[14px]">
              delivery time
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
