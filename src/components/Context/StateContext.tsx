"use client";
import { Image as IImage } from "sanity";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-hot-toast";

interface Product {
  quantity: number;
  name: any;
  price: number;
  _id: string;
  title: string;
  image: IImage;
  category: {
    name: string;
  };
}

interface StateContextType {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
  totalPrice: number;
  totalQty: number;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: Product, quantity: number) => void;
  toggleCartItemQuantity: (id: string, value: "inc" | "dec") => void;
  onRemove: (product: Product) => void;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  setTotalQty: React.Dispatch<React.SetStateAction<number>>;
}

const CartContext = createContext<StateContextType | undefined>(undefined);

interface StateContextProps {
  children: ReactNode;
}

export const StateContextProvider: React.FC<StateContextProps> = ({
  children,
}) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [qty, setQty] = useState(1);

  const onAdd = (product: Product, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQty((prevTotalQty) => prevTotalQty + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
        return cartProduct;
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product: Product) => {
    const foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    if (foundProduct) {
      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice - foundProduct.price * foundProduct.quantity
      );
      setTotalQty((prevTotalQty) => prevTotalQty - foundProduct.quantity);
      setCartItems(newCartItems);
    }
  };

  const toggleCartItemQuantity = (id: string, value: "inc" | "dec") => {
    const foundProduct = cartItems.find((item) => item._id === id);
    const index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (foundProduct) {
      if (value === "inc") {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity + 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
        setTotalQty((prevTotalQty) => prevTotalQty + 1);
      } else if (value === "dec") {
        if (foundProduct.quantity > 1) {
          setCartItems([
            ...newCartItems,
            { ...foundProduct, quantity: foundProduct.quantity - 1 },
          ]);
          setTotalPrice(
            (prevTotalPrice) => prevTotalPrice - foundProduct.price
          );
          setTotalQty((prevTotalQty) => prevTotalQty - 1);
        }
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  const stateContextValue: StateContextType = {
    showCart,
    setShowCart,
    cartItems,
    setCartItems,
    totalPrice,
    totalQty,
    qty,
    incQty,
    decQty,
    onAdd,
    toggleCartItemQuantity,
    onRemove,
    setTotalPrice,
    setTotalQty,
  };

  return (
    <CartContext.Provider value={stateContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useStateContext = (): StateContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error(
      "useStateContext must be used within a StateContextProvider"
    );
  }
  return context;
};
