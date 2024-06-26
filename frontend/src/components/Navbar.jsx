import React, { useState } from "react";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";
import { UserState } from "../context/UserContext";
import CustomDropdown from "./CustomDropdown";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const navigate = useNavigate();
  const {
    state: { user },
  } = UserState();
  return (
    <div className="navbarMainContainer flex flex-row  items-center x mx-auto p-2 sticky top-0 bg-gradient-to-r from-sky-500 to-purple-500 z-10 text-white">
      <div className="flex justify-between  w-[90%] mt-3">
        <p
          className="font-bold text-2xl mx-2 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          E-STORE
        </p>
      </div>
      <ul
        className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-row justify-around w-[50%]`}
      >
        <li
          className="cursor-pointer my-2"
          onClick={() => {
            window.location.href = "/#men";
          }}
        >
          Men
        </li>
        <li
          className="cursor-pointer my-2"
          onClick={() => {
            window.location.href = "/#women";
          }}
        >
          Women
        </li>
        <li
          className="cursor-pointer my-2"
          onClick={() => {
            window.location.href = "/#kids";
          }}
        >
          Kids
        </li>
        <li className="my-2">
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
        </li>
      </ul>
      <Cart className="mx-2" />
    </div>
  );
};

export default Navbar;
