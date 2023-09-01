//import route from "../../../api/cart"
import React, { useState } from "react";
import { client } from "@/lib/sanityClient";
import Image from "next/image";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../../../sanity/lib/image";
import Quantity from "../../../components/ui/Quantity";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CgShoppingCart } from "react-icons/cg";
import { useStateContext } from "../../../components/Context/StateContext";

interface IProduct {
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
export const getProductData = async () => {
  const res = await client.fetch(`*[_type=="product"]{
    price,
    _id,
    title,
    image,
    category -> {
      name
    }
  }`);
  return res;
};
export default async function Page({ params }: { params: { _id: string } }) {
  const data: IProduct[] = await getProductData();
  // const handleAddToCart = async () => {
  //   console.log(params._id);
  //   const res = await fetch("/api/cart", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       product_id: params._id,
  //     }),
  //   });
  //   console.log(res);
  //   const result = await res.json();
  //   console.log(result);

  // //const { image, name, details, price, tags, care } = product;
  // const [index, setIndex] = useState(0);
  // const { decQty, incQty, qty, onAdd } = useStateContext();

  // const careList: any[] = [];
  // const care: string | any[] =[];
  // {
  //   for (let i = 0; i < care.length; i++) {
  //     careList.push(care[i].children[0].text);
  //   }
  // }
  const result = data.filter((res) => res._id === params._id);
  console.log(result);
  if (!result) {
    return <div>No Products Found</div>;
  }

  const sizes = ["xs", "sm", "md", "lg", "xl"];

  return (
    <section>
      <div className="flex mt-16 py-10 flex-wrap ">
        {/* {result.map((item) => (
          <div key={item._id} className="flex justify-between">
            <div>
           <Image
                src={urlForImage(item.image).url()}
                width={300}
                height={300}
                alt={item.title}
              ></Image>
            </div>
            <div className="ml-5">
              Product Details
              <p>Name: {item.title}</p>
              <p>Price: {item.price}</p>
              <p>Category: {item.category.name}</p>
              <Button
                className=" w-full"
                onClick={() => {
                  handleAddToCart();
                }}
              >
                <ShoppingCart className="mr-2 " /> Add to Cart
              </Button>
            </div>
          </div>
  
   ))} */}

        {result.map((eachItem: IProduct) => (
          <div
            key={eachItem._id}
            className="flex justify-between items-center gap-6"
          >
            {/* Left Side  */}
            <div className="  border">
              <Image
                className=""
                src={urlForImage(eachItem.image).url()}
                alt={eachItem.title}
                width={600}
                height={800}
              />
            </div>
            {/* Right Side  */}
            <div>
              {" "}
              <div className="">
                <div>
                  <h1 className="text-4xl">{eachItem.title}</h1>
                  <h2 className="text-2xl text-gray-400 mt-3 font-semibold">
                    {eachItem.category.name}
                  </h2>
                </div>
                <div>
                  <h3 className="text-lg mt-6 font-semibold">SELECT SIZE</h3>

                  <div className="flex gap-x-5">
                    {sizes.map((size, index) => (
                      <div
                        key={index}
                        className="flex justify-center items-center h-10 w-10 border rounded-full hover:shadow-xl mt-2"
                      >
                        <span className="text-[21px] font-semibold text-center text-gray-600">
                          {size}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Quantity  */}
                  <div className="gap-x-3 mt-6 items-center">
                    <Quantity
                      product={eachItem}
                      num={1}
                      userId={eachItem._id}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
