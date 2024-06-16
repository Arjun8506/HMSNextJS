"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const Header = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isVisible, setisVisible] = useState(false);
  const [pageURL, setpageURL] = useState(window.location.href)

  const toggleVisibility = () => {
    setisVisible(!isVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  const locationTracker = () => {
    const urlParts = pageURL.split("/");
    const currentPage = urlParts[urlParts.length - 1];
    setpageURL(currentPage);
  };

  useEffect(() => {
    locationTracker();
    const handleRouteChange = () => {
      locationTracker();
    };
    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [pageURL]);

  console.log("Current Page URL:", pageURL);

  return (
    <header className="w-full h-16 flex justify-between relative">
      <div className="w-[60%] sm:w-[40%] md:w-[30%] lg:w-[20%] h-16">
        <video
          src="/LogoVideo.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover rounded-r-lg"
        ></video>
      </div>
      <div className=" w-[40%] sm:w-[60%] md:w-[70%] lg:w-[80%] flex flex-col">
        <div className=" w-full h-8"></div>
        <div className=" w-full h-8 bg-[#122C12] text-white flex justify-end items-center px-2">
        {windowWidth < 768 && (
            <>
              {isVisible ? (
                <RxCross2
                  className="text-2xl cursor-pointer transition-all ease-linear duration-500"
                  onClick={toggleVisibility}
                />
              ) : (
                <GiHamburgerMenu
                  className="text-2xl cursor-pointer transition-all ease-linear duration-500"
                  onClick={toggleVisibility}
                />
              )}
            </>
          )}
          <ul
            className={`${
              windowWidth < 768
                ? isVisible
                  ? "block opacity-100 translate-x-0 fixed w-[70%] h-screen bg-[#265c26] text-white top-0 left-0 transition-all ease-in-out duration-500 py-auto"
                  : "hidden opacity-0 -translate-x-full transition-all ease-in-out duration-500"
                : "flex items-center justify-between w-full lg:pl-4"
            }`}
          >
            <li>
              <Link
                href={"/"}
                className="py-4 md:py-0 md:px-5 w-full flex items-center justify-center hover:bg-[#0e1f0e] transition-all ease-in-out duration-500"
                onClick={toggleVisibility}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={"/about"}
                className="py-4 md:py-0 md:px-5 w-full flex items-center justify-center hover:bg-[#0e1f0e]  transition-all ease-in-out duration-500"
                onClick={toggleVisibility}
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                href={"/services"}
                className="py-4 md:py-0 md:px-5 w-full flex items-center justify-center hover:bg-[#0e1f0e]  transition-all ease-in-out duration-500"
                onClick={toggleVisibility}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href={"/contact"}
                className="py-4 md:py-0 md:px-5 w-full flex items-center justify-center hover:bg-[#0e1f0e]  transition-all ease-in-out duration-500"
                onClick={toggleVisibility}
              >
                Contact us
              </Link>
            </li>
            <li>
              <Link
                href={"/login"}
                className="py-4 md:py-0 md:px-5 w-full flex items-center justify-center hover:bg-[#0e1f0e]  transition-all ease-in-out duration-500"
                onClick={toggleVisibility}
              >
                Log In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
