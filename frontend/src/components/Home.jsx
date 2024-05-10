import React, { useEffect, useState } from "react";
// import LoginForm from "./LoginForm";
// import SignupForm from "./SignupForm";
// import AddProductForm from "./AddProduct";
import axios from "axios";
import ProductCard from "./ProductCard";
import Cart from "./Cart";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products/get-products"
      );
      console.log(response.data.data);
      setProducts(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Cart products={products}/>
      <div>
        <p className="text-center text-3xl font-bold my-5" id="men">MEN</p>
        <div className="flex flex-col sm:flex sm:flex-row sm:flex-wrap sm:justify-center">
          {products.map((item) => {
            if (item.category === "Men") {
              return <ProductCard item={item} />;
            }
            return null;
          })}
        </div>
      </div>
      <div>
        <p className="text-center text-3xl font-bold my-5" id="women">WOMEN</p>
        <div className="flex flex-col sm:flex sm:flex-row sm:flex-wrap sm:justify-center">
          {products.map((item) => {
            if (item.category === "Women") {
              return <ProductCard item={item} />;
            }
            return null;
          })}
        </div>
      </div>
      <div>
        <p className="text-center text-3xl font-bold my-5" id="kids">KIDS</p>
        <div className="flex flex-col sm:flex sm:flex-row sm:flex-wrap sm:justify-center">
          {products.map((item) => {
            if (item.category === "Kids") {
              return <ProductCard item={item} />;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

// import React from 'react'
// import ProductCard from './ProductCard'

// const Home = () => {
//   const item = {
//     title:"JACKET",
//     img: require('../assets/images/jacket.png'),
//     original_price:'$ 433434',
//     discounted_price:"$ 200",
//   }
//   return (
//     <div>
//       <ProductCard item={item} />
//     </div>
//   )
// }

// export default Home
