import { useState, createContext } from "react"
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
  const [name, setName] = useState("")

  const updateLetter = (letterString) => {
    setLetter(letterString)
  }
  const updateName = (name) => {
    const { first, last } = name
    setName(`${first} ${last}`)
  }

  const getLetter = () => letter

  const getName = () => {
    return name
  }
  return (
    <LetterContext.Provider
      value={{ updateLetter, getLetter, updateName, getName }}
    >
      {children}
    </LetterContext.Provider>
  )
}
