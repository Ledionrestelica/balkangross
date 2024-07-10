"use client";

import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const router = useRouter;

  useEffect(() => {
    setCartToState();
  }, []);

  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  };

  const addItemToCart = async ({
    product,
    name,
    price,
    image,
    articleNumber,
    quantity = 1,
  }) => {
    const item = {
      product,
      name,
      price,
      image,
      articleNumber,
      quantity,
    };

    const doesItemExist = cart?.cartItems?.find(
      (i) => i.product === item.product
    );

    let newCartItems;

    if (doesItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.product === doesItemExist.product ? item : i
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const deleteItemFromCart = (id) => {
    const newCartItems = cart?.cartItems?.filter((i) => i.product !== id);
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart, deleteItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
