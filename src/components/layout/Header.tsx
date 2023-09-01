"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "../../../public/logo.webp";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { CiSearch } from "react-icons/ci";
import {
  StateContextProvider,
  useStateContext,
} from "@/components/Context/StateContext"; // Update with the correct path
import { useAppDispatch, useAppSelector } from "../Redux/store";
import { fetchData } from "../Redux/CartSlice";
import { UserButton } from "@clerk/nextjs";

const Header = ({ userId }: { userId: string }) => {

  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  const [cartItem, setCartItem] = useState<number>(0);

  const dispatch = useAppDispatch();


  useEffect(() => {
      dispatch(fetchData(userId))
  }, [dispatch, userId])

  const totalItem = useAppSelector((state) => state.cart.totalQuantity);



  const { showCart, setShowCart, totalQty } = useStateContext();
  return (
    <header className="flex justify-between items-center py-6 px-9">
      <Link href="/">
        <Image src={Logo} alt="Logo" />
      </Link>
      <ul className="flex gap-x-10 text-lg">
        <li>
          <Link href="/Category/Female">Female</Link>
        </li>
        <li>
          <Link href="/Category/Male">Male</Link>
        </li>
        <li>
          <Link href="/Category/Kids">Kids</Link>
        </li>
        <li>
          <Link href="/AllProducts">All Products</Link>
        </li>
      </ul>
      <div className="flex items-center gap-2">
        <CiSearch />
        <input type="text" placeholder="What you looking for" />
      </div>
      <span>
        <UserButton afterSignOutUrl="/" />
      </span>
      {showCart ? (
        <Link href="/cart">
          {" "}
          <button className="cart" onClick={() => setShowCart(false)}>
            <div className="h-10 w-10 rounded-full bg-gray-200 flex justify-center  items-center">
              <ShoppingCart className="h-6 w-6"></ShoppingCart>
              <span className="cart-item-qty">{totalItem ? totalItem : 0}</span>
            </div>
          </button>
        </Link>
      ) : (
        <button className="cart" onClick={() => setShowCart(true)}>
          <div className="h-10 w-10 rounded-full bg-gray-200 flex justify-center  items-center">
            <ShoppingCart className="h-6 w-6"></ShoppingCart>
            <span className="cart-item-qty" mt-0>
              {totalItem ? totalItem : 0}
            </span>
          </div>{" "}
        </button>
      )}

      {/* <div className="h-10 w-10 rounded-full bg-gray-200 flex justify-center items-center">
        <ShoppingCart className="h-6 w-6"></ShoppingCart>
      </div> */}
    </header>
  );
};
export default Header;
