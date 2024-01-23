import React from "react"

export const LetterHeader = ({ header }) => {
  const obj = { __html: header }
  return (
    <>
      <div
        className="bg-[#e8e8e8] p-8 sm:p-10 text-md font-serif"
        dangerouslySetInnerHTML={obj}
      ></div>
      <div className="bg-[#91c2d0] font-bold py-4 text-center">
        You can use the letter as is or personalize the text below.
      </div>
    </>
  )
}
