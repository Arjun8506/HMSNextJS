"use client"

import React, { useEffect, useState } from 'react'

const HeroSection = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  return (
    <section>
      <div className="w-full min-h-96 mt-5 md:flex">
          <div className={`${windowWidth < 768 ? "hidden" : "block w-[20%] h-96 bg-slate-200"}`}></div>
          <div className="w-full md:w-[80%] h-96">
            <img src="https://img.freepik.com/free-photo/mountain-lake_1182-796.jpg?t=st=1718621660~exp=1718625260~hmac=1283d4238783fe3f6641fb10eab657057932e7cb660672da438b4491c7a83389&w=740" alt="BackgrundImage" className='w-full h-full object-cover rounded-b-lg' />
          </div>
      </div>
    </section>
  )
}

export default HeroSection