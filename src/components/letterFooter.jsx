import React from "react"
import { useEffect, useState, useContext } from "react"
import { NameContext } from "../providers/nameContext"

export const LetterFooter = () => {
  const { getName } = useContext(NameContext)
  const [name, setName] = useState("Your name")

  useEffect(() => {
    setName(getName())
  }, [getName])

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
