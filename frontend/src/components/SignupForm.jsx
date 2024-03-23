// import React, { useState } from "react";
// import { FaRegUser } from "react-icons/fa6";
// import { CiMail } from "react-icons/ci";
// import { IoLockClosedOutline } from "react-icons/io5";

// const SignupForm = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const submitSignpForm = (e) => {
//     e.preventDefault();
//     console.log(username, email, password);
//   };
//   return (
//     <div class=" bg-gradient-to-r from-sky-500 to-purple-500 flex items-center justify-center h-screen w-screen">
//       <form className="bg-white w-1/3 flex flex-col items-center p-8 rounded-lg">
//         <span className=" flex flex-row items-center mb-4 w-full">
//           <FaRegUser />
//           <input
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Username"
//             className="w-5/6 ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
//           />
//         </span>
//         <span className=" flex flex-row items-center mb-4 w-full">
//           <CiMail />
//           <input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             className="w-5/6 ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
//           />
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
//         <button
//           onClick={submitSignpForm}
//           className=" bg-gradient-to-r from-sky-500 to-purple-500 text-white px-4 py-2 rounded focus:outline-none focus:bg-blue-600 hover:bg-blue-600"
//         >
//           Sign Up
//         </button>
//         <p>OR</p>
//         <button
//           onClick={(e) => {
//             e.preventDefault();
//             console.log("go to login");
//           }}
//           className=" bg-gradient-to-r from-sky-500 to-purple-500 text-white px-4 py-2 rounded focus:outline-none focus:bg-blue-600 hover:bg-blue-600"
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
import { FaRegUser } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { CiFileOn } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const submitSignupForm = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profileImage", profileImage);

      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("User registered successfully:", response.data);
    } catch (error) {
      console.error("Error registering user:", error.response.data);
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
        <span className="flex flex-row items-center mb-4 w-full">
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
        <span className="flex flex-row items-center mb-4 w-full">
          <CiFileOn />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-5/6 ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500"
          />
        </span>
        <button
          onClick={submitSignupForm}
          className="bg-gradient-to-r from-sky-500 to-purple-500 text-white px-4 py-2 rounded focus:outline-none focus:bg-blue-600 hover:bg-blue-600"
        >
          Sign Up
        </button>
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
