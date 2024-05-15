import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  // useState,
} from "react";
import { cartReducer } from "./Reducers";
import axios from "axios";
const Cart = createContext();

const initialState = () => {
  const savedCart = localStorage.getItem("cart");
  return {
    products: [],
    cart: savedCart ? JSON.parse(savedCart) : [],
  };
};

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {}, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "          https://e-store-taupe.vercel.app/api/products/get-products"
        );
        dispatch({ type: "SET_PRODUCTS", payload: response.data.data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // const Context = ({ children }) => {
  //   const [products, setProducts] = useState([]);
  //   useEffect(() => {
  //     fetchProducts();
  //   }, []);
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://e-store-taupe.vercel.app/api/products/get-products"
  //       );
  //       console.log(response.data.data);
  //       setProducts(response?.data?.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const [state, dispatch] = useReducer(cartReducer, {
  //     products: products,
  //     cart: [],
  //   });

  return <Cart.Provider value={{ state, dispatch }}>{children}</Cart.Provider>;
};

export default Context;
export const CartState = () => {
  return useContext(Cart);
};
