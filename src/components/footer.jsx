import React from "react"
import footerLogo from "../assets/abbot-kinney-logo-gray-2x.webp"

export const Footer = () => {
  return (
    <div className="py-12 bg-[#101017]">
      <div className="flex justify-center items-center flex-col">
        <img
          src={footerLogo}
          alt="abbot kinney logo, footer"
          className="img-logo pb-4 "
        />
        <p className="text-white text-center font-extralight">
          881 Abbot Kinney Boulevard
          <br />
          Venice, CA 90291
        </p>
      </div>
    </div>
  )
}
