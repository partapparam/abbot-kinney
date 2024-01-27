import { useState, createContext } from "react"
import React from "react"
import PropTypes from "prop-types"

export const NameContext = createContext({})

export const NameProvider = ({ children }) => {
  const [name, setName] = useState("")
  const updateName = (name) => {
    const { first, last } = name
    setName(`${first} ${last}`)
  }
  const getName = () => {
    return name
  }
  return (
    <NameContext.Provider value={{ updateName, getName }}>
      {children}
    </NameContext.Provider>
  )
}

// NameProvider.propTypes = {
//   children: PropTypes.elementType,
// }
