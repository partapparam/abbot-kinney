import React from "react"
import logo from "../assets/abbot-kinney-logo-olive-2x-white.webp"

const Home = () => {
  return (
    <div className=" flex flex-col min-h-screen bg-[#89A0B0] justify-center items-center">
      <img src={logo} alt="company logo" />
      <p className="text-white text-2xl py-5 font-light ">
        Thank you for your support.
      </p>
    </div>
  )
}

export default Home
