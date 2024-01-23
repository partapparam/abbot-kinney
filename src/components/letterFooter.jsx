import React from "react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export const LetterFooter = () => {
  const [searchParams] = useSearchParams()
  const first = searchParams.get("first")
  const last = searchParams.get("last")
  const [name, setName] = useState("Your name")

  useEffect(() => {
    setName(`${first} ${last}`)
  }, [first, last])

  return (
    <div className="bg-[#e8e8e8] p-8 sm:p-10 text-md font-serif">
      Sincerely, <br />
      <br />
      <span className="font-serif italic tracking-tighter">
        {name != " " ? name : "Your name"}
      </span>
    </div>
  )
}
