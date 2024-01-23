import { useState, createContext, ReactNode } from "react"
import React from "react"

// interface Props {
//   children?: ReactNode
// }

// interface LetterContextType {
//   updateLetter: (letterString: string) => void
//   getLetter: () => string
// }

export const LetterContext = createContext({})

export const LetterProvider = ({ children }) => {
  const [letter, setLetter] = useState("")

  const updateLetter = (letterString) => {
    setLetter(letterString)
  }
  const getLetter = () => letter
  return (
    <LetterContext.Provider value={{ updateLetter, getLetter }}>
      {children}
    </LetterContext.Provider>
  )
}
