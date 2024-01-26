import logo from "../assets/logo-green-ivory-black.webp"
import React, { Suspense } from "react"
import Editor from "./editor"
import { LetterForm } from "./letterForm"
import { Footer } from "./footer"
import hotel from "../assets/hotel-transparent.png"
import { motion } from "framer-motion"
import { LoadingSpinner } from "./loading"

const Letter = () => {
  return (
    <motion.div
      className="flex flex-col bg-[#f9f5ef]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="w-5/6 sm:w-2/3 m-auto">
        <div className="min-h-48 mb-6 pt-16">
          <img src={logo} alt="" className="h-auto img-logo" />
        </div>
        <div className="mb-7 text-[#2385A3]">
          <h1 className="text-5xl sm:text-6xl font-light">
            <span className="font-extrabold">Send </span>the letter
          </h1>
        </div>
        <div className="container form ">
          <p className="text-justify whitespace-normal leading-2 pb-5">
            Below you’ll find the complete text of the support letter. You can
            sign by entering your name below and then use the submit button.
          </p>
        </div>
        <div className="">
          <Suspense fallback={<LoadingSpinner />}>
            <Editor />
            <LetterForm />
          </Suspense>
        </div>
      </div>
      <div className="">
        <img
          src={hotel}
          alt="abbot kinney hotel render"
          className="object-fill w-full"
        />
      </div>
      <Footer />
    </motion.div>
  )
}

export default Letter
