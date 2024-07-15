import Image from "next/image";
import { useState } from "react";
import CartContext from "@/CartContext";
import { useContext } from "react";

const CartProduct = ({ _id, name, price, quantity, artNum, imgUrl }) => {
  const [editMode, setEditMode] = useState(false);
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

    addItemToCart(item);
  };

  if (quantity === 0) {
    deleteItemFromCart(cartItem?.product);
  }

  return (
    <div className="flex flex-col relative max-w-[506px] min-h-[223px] rounded-[16px] bg-white border border-[#D4D4D4] px-[26px] py-[34px]">
      <div
        onClick={() => deleteItemFromCart(cartItem?.product)}
        className=" cursor-pointer absolute flex justify-center items-center w-[40px] h-[40px] top-[-15px] right-[-20px] bg-white  rounded-full shadow-lg"
      >
        <Image
          src="/trash.png"
          width={20}
          height={20}
          quality={100}
          alt="close"
        />
      </div>
      <div
        onClick={() => setEditMode((prev) => !prev)}
        className=" cursor-pointer absolute flex justify-center items-center w-[40px] h-[40px] top-[-15px] right-[24px] bg-white  rounded-full shadow-lg"
      >
        <Image
          src="/pen.png"
          width={20}
          height={20}
          quality={100}
          alt="close"
        />
      </div>
      <div className="flex gap-2 pb-[21px] border-b border-b-[#F1F1F1]">
        <div className="rounded-lg flex items-center justify-center w-[60px] h-[60px] relative bg-secondary">
          <p>
            <Image
              src={imgUrl}
              alt="no image available"
              width={40}
              height={40}
              quality={100}
            />
          </p>
        </div>
        <div className="flex flex-col gap-2 line-clamp-1">
          <p className="text-[#292e33] text-[18px] font-medium">{name}</p>
          <p className="text-[#4C5760] text-[16px]">{artNum}</p>
        </div>
      </div>
      <div className="flex justify-between mt-[24px] px-[14px]">
        <div className="flex flex-col gap-3">
          <p className="text-[#4C5760] text-[16px]">Price:</p>
          <p className="text-[18px]">kr: {price}</p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[#4C5760] text-[16px]">Quantity:</p>
          <p className="text-[18px]">{quantity}</p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[#4C5760] text-[16px]">Total</p>
          <p className="text-[18px]">{(price * quantity).toFixed(2)}</p>
        </div>
      </div>
      {editMode && (
        <div className="px-[14px] pt-[5px]">
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
            <span>{quantity}</span>
            <button
              onClick={() => increaseQty(cartItem)}
              className="w-[50px] rounded-[8px] h-full text-white bg-slate-600"
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartProduct;
