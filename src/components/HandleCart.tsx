"use client";
//import route from "../api/cart/route"
import Image from "next/image";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../sanity/lib/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { FC } from "react";

const HandleCart: FC<{ props: any }> = ({ props }) => {
  const handleAddToCart = async () => {
    const res = await fetch("../api/cart", {
      method: "POST",
      body: JSON.stringify({
        product_id: props._id,
      }),
    });
    console.log(res);
    const result = await res.json();
    console.log(result);
  };

  return (
    <div>
      <Button className=" w-full" onClick={() => handleAddToCart()}>
        <ShoppingCart className="mr-2 " /> Add to Cart
      </Button>
    </div>
  );
};

export default HandleCart;
