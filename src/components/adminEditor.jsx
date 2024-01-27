import { useEffect, useState } from "react"
import React from "react"
import {
  getAdminEditorContent,
  updateLetterContent,
} from "../services/formService"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.bubble.css"
import { useParams } from "react-router-dom"
import { LoadingSpinner } from "./loading"

const AdminEditor = () => {
  const [letter, setLetter] = useState()
  const { type, id } = useParams()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchContent = async (id) => {
      //   id: string
      setIsLoading(true)
      const result = await getAdminEditorContent(id)
      setLetter(JSON.parse(result.content))
    }
    if (type && id) {
      fetchContent(id)
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false))
    }
  }, [type, id])

  const editorModules = {
    toolbar: false,
  }

  const handleChange = (content, delta, source, editor) => {
    setLetter(content)
  }

  const capitalize = (string) => {
    const firstLetter = string.charAt(0).toUpperCase()
    const remainingLetters = string.slice(1)
    return firstLetter + remainingLetters
  }

  const submitChanges = async () => {
    setIsLoading(true)
    const jsonContent = JSON.stringify(letter)
    const data = [
      {
        id: id,
        fields: {
          type: type,
          content: jsonContent,
        },
      },
    ]

    await updateLetterContent(data)
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="py-5 px-5 sm:px-15 md:px-20 flex flex-col">
      {isLoading && <LoadingSpinner />}
      {letter && !isLoading && (
        <div>
          <p className="text-4xl py-4 font-bold">Update {capitalize(type)}</p>
          {/* border-[#f5eee5] */}
          <div className="border-8 border-black rounded-md shadow-md p-5">
            <ReactQuill
              value={letter}
              defaultValue={letter}
              onChange={handleChange}
              modules={editorModules}
              theme="bubble"
            />
          </div>
          <button
            onClick={submitChanges}
            className="px-6 py-2 my-4 w-[128px] text-white bg-green-500 hover:bg-green-600 rounded-md"
          >
            Save
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminEditor
