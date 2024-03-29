import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  RouterProvider,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import AddProductForm from "./components/AddProduct";
import Home from "./components/Home";

// createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Root />}>
//       <Route path="contact" element={<Contact />} />
//       <Route
//         path="dashboard"
//         element={<Dashboard />}
//         loader={({ request }) =>
//           fetch("/api/dashboard.json", {
//             signal: request.signal,
//           })
//         }
//       />
//       <Route element={<AuthLayout />}>
//         <Route path="login" element={<Login />} loader={redirectIfUser} />
//         <Route path="logout" action={logoutUser} />
//       </Route>
//     </Route>
//   )
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/register" element={<SignupForm />}></Route>
      <Route path="/add-product" element={<AddProductForm />}></Route>
    </Route>
  )
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
