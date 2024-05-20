import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import Hero from "./Hero";
import { UserState } from "../context/UserContext";

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

  const {
    state: { user },
  } = UserState();

  return (
    <div>
      <div>
        <Hero />
      </div>
      <div id="collection">
        {user ? (
          <p className="text-center capitalize">WELCOME:{user?.username}</p>
        ) : null}

        <p
          className="text-center text-3xl font-bold my-5 text-sky-500"
          id="men"
        >
          MEN
        </p>
        <div className="flex flex-col sm:flex sm:flex-row sm:flex-wrap sm:justify-center">
          {products.map((item) => {
            if (item.category === "Men") {
              return <ProductCard key={item._id} item={item} />;
            }
            return null;
          })}
        </div>
      </div>
      <div>
        <p
          className="text-center text-3xl font-bold my-5 text-customPink"
          id="women"
        >
          WOMEN
        </p>
        <div className="flex flex-col sm:flex sm:flex-row sm:flex-wrap sm:justify-center">
          {products.map((item) => {
            if (item.category === "Women") {
              return <ProductCard key={item._id} item={item} />;
            }
            return null;
          })}
        </div>
      </div>
      <div>
        <p
          className="text-center text-3xl font-bold my-5 text-customMint"
          id="kids"
        >
          KIDS
        </p>
        <div className="flex flex-col sm:flex sm:flex-row sm:flex-wrap sm:justify-center">
          {products.map((item) => {
            if (item.category === "Kids") {
              return <ProductCard key={item._id} item={item} />;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
