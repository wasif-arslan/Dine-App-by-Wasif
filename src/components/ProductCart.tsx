"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../sanity/lib/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function ProductsCart(props: {
  price: number;
  _id: string;
  title: string;
  image: IImage;
  category: {
    name: string;
  };
}) {
  const handleAddToCart = async () => {
    const res = await fetch("/api/cart", {
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
      <Link href={`/AllProducts/${props._id}`}>
        <div className="py-8">
          <Image
            src={urlForImage(props.image).url()}
            width={300}
            height={300}
            alt="product"
          ></Image>
          <h3 className="font-bold text-lg mt-3">{props.title}</h3>
          <p className="font-bold text-lg">{props.price}</p>
          <p className="font-bold text-base">
            Category:{" "}
            <span className="text-base font-normal capitalize">
              {props.category.name}
            </span>
          </p>
        </div>
      </Link>
      <Button className=" w-full" onClick={handleAddToCart}>
        <ShoppingCart className="mr-2 " /> Add to Cart
      </Button>
    </div>
  );
}
