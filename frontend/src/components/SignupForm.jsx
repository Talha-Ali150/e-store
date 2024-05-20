// import React, { useState } from "react";
// import axios from "axios";
// import { FaRegUser } from "react-icons/fa6";
// import { CiMail } from "react-icons/ci";
// import { CiFileOn } from "react-icons/ci";
// import { IoLockClosedOutline } from "react-icons/io5";
// import Loader from "./Loader";
// import { useNavigate } from "react-router-dom";

// const SignupForm = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [profileImage, setProfileImage] = useState(null);
//   const [formErrors, setFormErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setProfileImage(file);
//   };

//   const validateForm = () => {
//     const errors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email) {
//       errors.email = "Please enter email";
//     }
//     if (!emailRegex.test(email)) {
//       errors.invalidEmail = "Please enter a valid email address";
//     }
//     if (!password) {
//       errors.password = "Please enter password";
//     }
//     if (!username) {
//       errors.username = "Please enter username";
//     }
//     if (!profileImage) {
//       errors.profileImage = "Please choose an image to upload";
//     }
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const uploadImage = async (pic) => {
//     if (!pic) {
//       setError("Please select an image");
//       return;
//     }

//     if (pic.type === "image/jpeg" || pic.type === "image/png") {
//       const data = new FormData();
//       data.append("file", pic);
//       data.append("upload_preset", "mern-notes");
//       data.append("cloud_name", "mern-notes");
//       try {
//         setLoading(true);
//         const response = await fetch(
//           "https://api.cloudinary.com/v1_1/mern-notes/image/upload",
//           {
//             method: "POST",
//             body: data,
//           }
//         );
//         const myData = await response.json();
//         if (myData) {
//           setLoading(false);
//         }
//         const { url } = myData;
//         setValues({ ...values, pic: url });
//       } catch (e) {
//         console.log("Cloudinary error:", e);
//         setLoading(false);
//       }
//     } else {
//       setError("Please select a valid image (JPEG or PNG)");
//     }
//   };


//   const submitSignupForm = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       return;
//     }
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "https://e-store-taupe.vercel.app/api/users/register",
//         { username, email, password, profileImage },
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("User registered successfully:", response.data);
//       setError("");
//       setEmail("");
//       setPassword("");
//       setUsername("");
//       setProfileImage(null);
//       navigate('/login')
//     } catch (error) {
//       console.error("Error registering user:", error.response.data);
//       setError(error.response.data.error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gradient-to-r from-sky-500 to-purple-500 flex items-center justify-center h-screen w-[100%]">
//       <form className="w-[90%] bg-white  flex flex-col items-center p-8 rounded-lg sm:w-1/3">
//         <span className="flex flex-row items-center mb-4 w-full">
//           <FaRegUser />
//           <input
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Username"
//             className="w-5/6 ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
//           />
//         </span>
//         <span className="text-red-500">{formErrors.username}</span>
//         <span className="flex flex-row items-center mb-4 w-full">
//           <CiMail />
//           <input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             className="w-5/6 ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
//           />
//         </span>
//         <span className="text-red-500">
//           {formErrors.email || formErrors.invalidEmail}
//         </span>
//         <span className="flex flex-row items-center mb-4 w-full">
//           <IoLockClosedOutline />
//           <input
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             type="password"
//             className="w-5/6 ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
//           />
//         </span>
//         <span className="text-red-500">{formErrors.password}</span>
//         <span className="flex flex-row items-center mb-4 w-full">
//           <CiFileOn />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="w-5/6 ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
//           />
//         </span>
//         <span className="text-red-500">{formErrors.profileImage}</span>
//         <span className="text-red-500">{error}</span>
//         {loading ? (
//           <Loader />
//         ) : (
//           <button
//             onClick={submitSignupForm}
//             className="bg-gradient-to-r from-sky-500 to-purple-500 text-white px-4 py-2 rounded focus:outline-none focus:bg-blue-600 hover:bg-blue-600"
//           >
//             Sign Up
//           </button>
//         )}
//         <p>OR</p>
//         <button
//           onClick={(e) => {
//             e.preventDefault();
//             navigate("/login");
//           }}
//           className="bg-gradient-to-r from-sky-500 to-purple-500 text-white px-4 py-2 rounded focus:outline-none focus:bg-blue-600 hover:bg-blue-600"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignupForm;


import React, { useState } from "react";
import axios from "axios";
import { FaRegUser } from "react-icons/fa";
import { CiMail, CiFileOn } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "mern-notes");
    data.append("cloud_name", "mern-notes");

    try {
      setLoading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/mern-notes/image/upload",
        data
      );
      setLoading(false);
      return response.data.url;
    } catch (e) {
      console.log("Cloudinary error:", e);
      setLoading(false);
      return null;
    }
  };

  const submitSignupForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);

    try {
      const profileImageUrl = await uploadImageToCloudinary(profileImage);

      if (!profileImageUrl) {
        setError("Failed to upload profile image");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "https://e-store-taupe.vercel.app/api/users/register",
        { username, email, password, profileImage: profileImageUrl }
      );

      console.log("User registered successfully:", response.data);
      setError("");
      setEmail("");
      setPassword("");
      setUsername("");
      setProfileImage(null);
      navigate("/login");
    } catch (error) {
      // console.error("Error registering user:", error.response.data);
      console.log("Error registering user:", error.response.data);
      // setError(error.response.data.error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-sky-500 to-purple-500 flex items-center justify-center h-screen w-[100%]">
      <form className="w-[90%] bg-white  flex flex-col items-center p-8 rounded-lg sm:w-1/3">
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
            navigate("/login");
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
