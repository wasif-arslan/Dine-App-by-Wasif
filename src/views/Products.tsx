import ProductCart from "@/components/ProductCart";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { Image as IImage } from "sanity";
import { urlForImage } from "../../sanity/lib/image";

import { client } from "@/lib/sanityClient";

interface IProduct {
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

export default async function ProductData() {
  const data: IProduct[] = await getProductData();
  const productChoncks = data.slice(0, 3);
  return (
    <section>
      <div className="flex justify-between mt-16">
        {productChoncks.map((item) => (
          <ProductCart
            key={item._id}
            title={item.title}
            price={item.price}
            image={item.image}
            category={item.category}
            _id={item._id}
          ></ProductCart>
        ))}
      </div>
    </section>
  );
}
