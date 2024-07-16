"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import CartContext from "@/CartContext";
import { urlFor } from "@/utils/sanity/_imageBuilder";

const Product = ({ _id, artNum, ean, active, price, name, imgUrl, vikt }) => {
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
      image: urlFor(imgUrl).url(),
    });
  };

  return (
    <div
      key={_id}
      className="flex px-[16px] pb-[17px] flex-col border border-[#E7E7E7] w-[295px] h-[480px] rounded-[12px]"
    >
      <div className="relative flex-1 flex justify-center items-center">
        <Link href={`product/${_id}`}>
          {imgUrl ? (
            <Image
              className="object-contain"
              src={urlFor(imgUrl).url()}
              fill
            ></Image>
          ) : (
            <p>No image available</p>
          )}
        </Link>
      </div>

      <div className="flex flex-col gap-[8px]">
        <p className="font-semibold text-[18px] text-[#040300] line-clamp-2 h-[60px]">
          <Link href={`/product/${_id}`}>{name}</Link>
        </p>
        <div className="flex justify-between">
          <p className="font-light text-[16px] text-[#585858]">
            Art nr:{" "}
            <span className="font-semibold text-[#585858]">{artNum}</span>
          </p>
          <p className="flex items-center gap-1 font-light text-[16px] text-[#585858]">
            Stock:
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
        </div>
        <div className="flex justify-between">
          <p className="font-light text-[16px] text-[#585858]">
            Price: <span className="font-semibold text-[#585858]">{price}</span>
          </p>
          <p className="font-light text-[16px] text-[#585858]">
            Vikt: <span className="font-semibold text-[#585858]">{vikt}</span>
          </p>
        </div>

        {cartItem ? (
          <div
            className="rounded-[8px] border border-[#E0E0E0] h-[42.5px] font-normal
            text-[15px] text-[#585858]  flex justify-between items-center"
          >
            <button
              className="w-[50px] rounded-[8px] h-full text-white bg-slate-600"
              onClick={() => decreaseQty(cartItem)}
            >
              -
            </button>
            <span>{cartItem.quantity}</span>
            <button
              className="w-[50px] rounded-[8px] h-full text-white bg-slate-600"
              onClick={() => increaseQty(cartItem)}
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="rounded-[8px] border border-[#E0E0E0] py-[9px] font-normal
            text-[15px] text-[#585858]  flex gap-3 justify-center items-center"
            onClick={addToCartHandler}
          >
            Add Product
            <span className="relative flex justify-center items-center">
              <div className="w-[1.5px] rounded-lg h-[13px] absolute bg-[#323F4B] rotate-90"></div>
              <div className="w-[1.5px] rounded-lg h-[13px] absolute bg-[#323F4B]"></div>
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
