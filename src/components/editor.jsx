import ReactQuill from "react-quill"
import React from "react"
import "react-quill/dist/quill.bubble.css"
import { useContext, useLayoutEffect, useState } from "react"
import { LetterHeader } from "./letterHeader"
import { LetterFooter } from "./letterFooter"
import { LetterContext } from "../providers/letterContext"
import { getContent } from "../services/formService"
import { LoadingSpinner } from "./loading"
import { motion } from "framer-motion"

const Editor = () => {
  const [editorHtml, setEditorHtml] = useState()
  const { updateLetter } = useContext(LetterContext)
  const [header, setHeader] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const editorModules = {
    toolbar: false,
  }

  useLayoutEffect(() => {
    const fetch = async () => {
      setIsLoading(true)
      const results = await getContent()
      // console.log(results)
      const letter = results[0].content
      const header = results[1].content
      setEditorHtml(JSON.parse(letter))
      setHeader(JSON.parse(header))
    }
    fetch()
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  const handleChange = async (content, delta, source, editor) => {
    setEditorHtml(content)
    const text = editor.getText()
    const jsonText = JSON.stringify(text)
    updateLetter(jsonText)
  }

  return (
    <div className="flex flex-col bg-white border-8 border-[#f5eee5]">
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          <LetterHeader header={header} />
          <ReactQuill
            value={editorHtml}
            defaultValue={editorHtml}
            onChange={handleChange}
            modules={editorModules}
            theme="bubble"
          />
          <LetterFooter />
        </motion.div>
      )}
    </div>
  )
}

export default Editor
