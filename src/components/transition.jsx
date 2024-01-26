import { motion } from "framer-motion"
import React from "react"

const TransitionComponent = ({ ChildComponent }) => {
  return () => {
    ;<>
      <ChildComponent />
      <motion.div
        className="bg-black"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="bg-blue"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 1 }}
      />
    </>
  }
}

export default TransitionComponent
