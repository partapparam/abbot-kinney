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
    <div className="mx-5 md:mx-15 my-5 flex flex-col bg-white">
      {isLoading && <LoadingSpinner />}
      {letter && !isLoading && (
        <div className="border-8 border-[#f5eee5]">
          <ReactQuill
            value={letter}
            defaultValue={letter}
            onChange={handleChange}
            modules={editorModules}
            theme="bubble"
          />
        </div>
      )}

      <button
        onClick={submitChanges}
        className="px-4 py-2 my-2 w-[96px] text-white bg-green-500 hover:bg-green-600 rounded-md"
      >
        Save
      </button>
    </div>
  )
}

export default AdminEditor
