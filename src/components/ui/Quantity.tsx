"use client";
import { useState } from "react";
import { Button } from "./button";
import { useDispatch } from "react-redux";
import { cartAction } from "../Redux/CartSlice";
import { urlForImage } from "../../../sanity/lib/image";
import { toast } from "react-hot-toast";
import { Image as IImage } from "sanity";

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

type IProps = {
  product: IProduct;
  num: number;
  userId: string | any;
};

const Quantity = (props: IProps) => {
  const dispatch = useDispatch();
  const [num, setNum] = useState(1);

  const getDataFromDB = async () => {
    const res = await fetch(`/api/cart/${props.userId}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  };
  const hanldeAddToCart = async () => {
    const res = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({
        product_id: props.product._id,
        product_name: props.product.title,
        quantity: num,
        subcat: props.product.category.name,
        image: urlForImage(props.product.image).url(),
        price: props.product.price,
        total_price: props.product.price * num,
      }),
    });
  };

  const handleCart = async () => {
    try {
      const cartData = await getDataFromDB();
      const existingItem = cartData?.cartItems?.find(
        (item: any) => item._id === props.product._id
      );
      if (existingItem) {
        const newQuantity = existingItem.quantity + num;
        const newTotalPrice = props.product.price * newQuantity;

        const res = await fetch(`/api/cart`, {
          method: "PUT",
          body: JSON.stringify({
            product_id: props.product._id,
            quantity: newQuantity,
            price: newTotalPrice,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to update Data");
        }
      } else {
        await hanldeAddToCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = () => {
    toast.promise(handleCart(), {
      loading: "Cart Adding.....",
      success: "Data Add Successfully",
      error: "Failed to add Data",
    });
    dispatch(cartAction.addToCart({ product: props.product, quantity: num }));
  };

  return (
    <>
      <div className="flex gap-x-4 items-center">
        <h3 className="text-[10px] font-semibold">Quantity:</h3>

        {/* Miunus   */}
        <button
          className="border h-7 w-7 rounded-full flex justify-center items-center"
          onClick={() => setNum(num <= 1 ? 1 : num - 1)}
        >
          -
        </button>
        {/* Number   */}
        <span className="text-sm">{num}</span>
        {/* Plus   */}
        <button
          className="border h-7 w-7 rounded-full flex justify-center items-center"
          onClick={() => setNum(num + 1)}
        >
          +
        </button>
      </div>
      <div className="flex justify-center mt-6 items-center gap-x-4">
        <Button className="flex bg-black" onClick={addToCart}>
          Add to Cart
        </Button>
        <h2 className="text-2xl font-bold">{props.product.price}</h2>
      </div>
    </>
  );
};

export default Quantity;
