import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import AddProductForm from "./components/AddProduct";
import Home from "./components/Home";
import Details from "./components/Details";
import Context from "./context/Context";
import UserContext from "./context/UserContext";
import Layout from "./Layout";
import Checkout from "./components/Checkout";
import MyProducts from "./components/MyProducts";
import EditProduct from "./components/EditProduct";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/detail-page/:id" element={<Details />}></Route>
      <Route path="/register" element={<SignupForm />}></Route>
      <Route path="/add-product" element={<AddProductForm />}></Route>
      <Route path="/checkout" element={<Checkout />}></Route>
      <Route path="/my-products" element={<MyProducts />}></Route>
      <Route path="/edit-product/:id" element={<EditProduct />}></Route>
    </Route>
  )
);
root.render(
  <React.StrictMode>
    <UserContext>
      <Context>
        <RouterProvider router={router} />
      </Context>
    </UserContext>
  </React.StrictMode>
);
