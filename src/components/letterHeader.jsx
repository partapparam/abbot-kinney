import React, { useEffect, useRef, useState } from "react"
import DOMPurify from "dompurify"
export const LetterHeader = ({ header }) => {
  const htmlRef = useRef(null)

  useEffect(() => {
    /**
     * Parsing HTML strings in React can be risky, opening us up to XSS vulnerability
     * DOMPurify will sanitize the HTML string to ensure no harmful data is present
     */
    const clean = DOMPurify.sanitize(header)
    htmlRef.current.innerHTML = clean
    if (clean) {
      setLoading(false)
    }
  }, [htmlRef, header])

  return (
    <>
      <div
        className="bg-[#e8e8e8] p-8 sm:p-10 text-md font-serif"
        ref={htmlRef}
      ></div>
      <div className="bg-[#91c2d0] font-bold py-4 text-center">
        You can use the letter as is or personalize the text below.
      </div>
    </>
  )
}
