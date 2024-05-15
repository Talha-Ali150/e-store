import React, { useState } from "react";
import axios from "axios";
import { CiMail } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import Loader from "./Loader";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Please enter email";
    }
    if (!password) {
      errors.password = "Please enter password";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitLoginForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://e-store-taupe.vercel.app/api/users/login",
        {
          email,
          password,
        },
        config
      );
      console.log("this is reponse:", response.data);
      setError("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("this si error ", error.response.data.error.message);

      setError(error.response.data.error.message);
    } finally {
      setLoading(false);
    }
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
        <span className="text-red-500">{formErrors.email}</span>
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
        <span className="text-red-500">{formErrors.password}</span>
        <span className="text-red-500">{error}</span>
        {loading ? (
          <Loader />
        ) : (
          <button
            onClick={submitLoginForm}
            type="submit"
            className=" bg-gradient-to-r from-sky-500 to-purple-500 text-white px-4 py-2 rounded focus:outline-none focus:bg-blue-600 hover:bg-blue-600"
          >
            Login
          </button>
        )}

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
        <button
          onClick={async (e) => {
            e.preventDefault();
            try {
              await axios.post(
                "https://e-store-taupe.vercel.app/api/users/logout",
                null,
                {
                  withCredentials: true,
                }
              );
            } catch (error) {
              console.error(error);
            }
          }}
          className=" bg-gradient-to-r from-sky-500 to-purple-500 text-white px-4 py-2 rounded focus:outline-none focus:bg-blue-600 hover:bg-blue-600"
        >
          Log Out
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
