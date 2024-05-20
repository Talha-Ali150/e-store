import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MobileNavbar from "./components/MobileNavbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth <= 640;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {isMobile ? <MobileNavbar /> : <Navbar />}
      <Outlet />
    </>
  );
}
