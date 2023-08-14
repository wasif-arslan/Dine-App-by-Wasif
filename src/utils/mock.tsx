/*import { Product } from "./types";
import P1 from "/public/p1.png";

 const ListOfProducts: Product[] = [
  {
    id: "1",
    name: "Product 1",
    price: 100,
    category: "Female",
    image: P1,
  },
  {
    id: "2",
    name: "Product 2",
    price: 100,
    category: "Female",
    image: P1,
  },
  {
    id: "3",
    name: "Product 3",
    price: 300,
    category: "male",
    image: P1,
  },
  {
    id: "4",
    name: "Product 4",
    price: 200,
    category: "Kids",
    image: P1,
  },{
    id: "5",
    name: "Product 5",
    price: 200,
    category: "Male",
    image: P1,
  },{
    id: "6",
    name: "Product 6",
    price: 200,
    category: "Kids",
    image: P1,
  },
  {
    id: "7",
    name: "Product 7",
    price: 100,
    category: "Female",
    image: P1,
  }
];





export default ListOfProducts;
*/

// ProductData.tsx

import { client } from "@/lib/sanityClient";

interface IProduct {
  price: number;
  _id: string;
  title: string;
  image: any; // Update the type of "image" as per your requirements
  category: {
    name: string;
  };
}

const ListOfProducts = async () => {
  const res = await client.fetch(`*[_type=="product"]{
    price,
    _id,
    title,
    image,
    category -> {
      name
    }
  }`);
  console.log(res)
  return res;
};
export default ListOfProducts;