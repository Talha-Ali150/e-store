import React, { useEffect, useState } from "react";
import axios from "axios";
import MyProductsList from "./MyProductsList";
import { UserState } from "../context/UserContext";
import { Alert, Space } from "antd";
import { useNavigate } from "react-router-dom";

const MyProducts = () => {
  const navigate = useNavigate();
  const {
    state: { user },
  } = UserState();

  const [data, setData] = useState([]);

  const getOwnedProducts = async () => {
    try {
      const response = await axios.get(
        "https://e-store-taupe.vercel.app/api/products/get-myproducts",
        { withCredentials: true }
      );
      const { data } = response.data;
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    getOwnedProducts();
  }, [user]);

  return (
    <div>
      {data.length < 1 ? (
        <p>no owned products</p>
      ) : (
        <MyProductsList data={data} />
      )}
    </div>
  );
};

export default MyProducts;
