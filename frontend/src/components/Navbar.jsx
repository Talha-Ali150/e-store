import React from "react";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";
import { UserState } from "../context/UserContext";
import CustomDropdown from "./CustomDropdown";

const Navbar = () => {
  const navigate = useNavigate();
  const {
    state: { user },
  } = UserState();
  return (
    <div className="navbarMainContainer flex justify-between items-center x mx-auto p-2 sticky top-0 bg-gradient-to-r from-sky-500 to-purple-500 z-10 text-white">
      <p
        className="font-bold mx-2 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        E-STORE
      </p>
      <ul className="flex justify-around w-[50%] ">
        <li
          className="cursor-pointer"
          onClick={() => {
            window.location.href = "/#men";
          }}
        >
          Men
        </li>
        <li
          className="cursor-pointer"
          onClick={() => {
            window.location.href = "/#women";
          }}
        >
          Women
        </li>
        <li
          className="cursor-pointer"
          onClick={() => {
            window.location.href = "/#kids";
          }}
        >
          Kids
        </li>
      </ul>
      {!user ? (
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          login
        </button>
      ) : (
        <CustomDropdown />
      )}
      <Cart className="mx-2" />
    </div>
  );
};

export default Navbar;
