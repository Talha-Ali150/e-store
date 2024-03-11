import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLoginForm = (e) => {
    e.preventDefault();
    console.log(email + ", " + password);
  };
  return (
    <div class=" bg-gradient-to-r from-sky-500 to-purple-500 flex items-center justify-center h-screen w-screen">
      <form className="bg-white w-1/3 flex flex-col items-center p-8 rounded-lg">
        <span className=" flex flex-row items-center mb-4 w-full">
          <CiMail />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-5/6 ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
          />
        </span>
        <span className="flex flex-row items-center mb-4 w-full">
          <IoLockClosedOutline />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-5/6 ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
          />
        </span>
        <button
          onClick={submitLoginForm}
          type="submit"
          className=" bg-gradient-to-r from-sky-500 to-purple-500 text-white px-4 py-2 rounded focus:outline-none focus:bg-blue-600 hover:bg-blue-600"
        >
          Login
        </button>
        <p>OR</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log("go to signup");
          }}
          className=" bg-gradient-to-r from-sky-500 to-purple-500 text-white px-4 py-2 rounded focus:outline-none focus:bg-blue-600 hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
