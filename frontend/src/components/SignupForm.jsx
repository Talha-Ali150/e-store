import React, { useState } from "react";
import axios from "axios";
import { FaRegUser } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { CiFileOn } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import Loader from "./Loader";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = "Please enter email";
    }
    if (!emailRegex.test(email)) {
      errors.invalidEmail = "Please enter a valid email address";
    }
    if (!password) {
      errors.password = "Please enter password";
    }
    if (!username) {
      errors.username = "Please enter username";
    }
    if (!profileImage) {
      errors.profileImage = "Please choose an image to upload";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitSignupForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        "https://e-store-taupe.vercel.app//api/users/register",
        { username, email, password, profileImage },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("User registered successfully:", response.data);
      setError("");
      setEmail("");
      setPassword("");
      setUsername("");
      setProfileImage(null);
    } catch (error) {
      console.error("Error registering user:", error.response.data);
      setError(error.response.data.error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-sky-500 to-purple-500 flex items-center justify-center h-screen w-screen">
      <form className="bg-white w-1/3 flex flex-col items-center p-8 rounded-lg">
        <span className="flex flex-row items-center mb-4 w-full">
          <FaRegUser />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-5/6 ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
          />
        </span>
        <span className="text-red-500">{formErrors.username}</span>
        <span className="flex flex-row items-center mb-4 w-full">
          <CiMail />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-5/6 ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
          />
        </span>
        <span className="text-red-500">
          {formErrors.email || formErrors.invalidEmail}
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
        <span className="text-red-500">{formErrors.password}</span>
        <span className="flex flex-row items-center mb-4 w-full">
          <CiFileOn />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-5/6 ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
          />
        </span>
        <span className="text-red-500">{formErrors.profileImage}</span>
        <span className="text-red-500">{error}</span>
        {loading ? (
          <Loader />
        ) : (
          <button
            onClick={submitSignupForm}
            className="bg-gradient-to-r from-sky-500 to-purple-500 text-white px-4 py-2 rounded focus:outline-none focus:bg-blue-600 hover:bg-blue-600"
          >
            Sign Up
          </button>
        )}
        <p>OR</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log("go to login");
          }}
          className="bg-gradient-to-r from-sky-500 to-purple-500 text-white px-4 py-2 rounded focus:outline-none focus:bg-blue-600 hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
