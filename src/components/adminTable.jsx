import { useEffect, useState } from "react"
import React from "react"
import { getContent, getTableData } from "../services/formService"
import { pdfExporter } from "quill-to-pdf"
import { saveAs } from "file-saver"
import Delta from "quill-delta"
import Merger from "../services/fileMergerService"
import { LoadingSpinner } from "./loading"
import DataTable from "./table"

// interface Config {
//   styles: {
//     normal?: {
//       font?: string
//       fontSize?: number // specified in points
//       baseIndent?: number // specified in points w/ 72 ppi
//       levelIndent?: number // only used for lists
//       indent?: {
//         left?: number
//         right?: number
//       }
//     }
//   }
// }

const QUILLCONFIG = {
  styles: {
    normal: {
      font: "Times-Roman",
      fontSize: 10,
    },
  },
}

const AdminTable = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [header, setHeader] = useState()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const tableResponse = await getTableData()
      const contentResponse = await getContent()
      const letterHeader = contentResponse[1].content
      setData(tableResponse)
      setHeader(JSON.parse(letterHeader))
    }
    fetchData()
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  const handleDownload = async (record) => {
    const delta = JSON.parse(record.letter)
    const nameString = `${record.firstName} ${record.lastName}`
    // The regex will remove all tags from the string
    // we remove the <br> first ensure better spacing
    const plainTextString = header.replace("<br>", "").replace(/<[^>]+>/g, "\n")

    console.log(plainTextString)
    const d = new Delta()
      .insert(plainTextString)
      .insert("\n")
      .insert(delta)
      .insert("\nSincerely,\n")
      .insert(nameString, { italic: true })
    const blob = await pdfExporter.generatePdf(d, QUILLCONFIG)
    // const reader = new FileReader()
    // reader.readAsDataURL(blob)
    // reader.onload = function () {
    //   console.log(reader.result)
    // }
    return blob
  }

  const saveOne = async (record) => {
    const blob = await handleDownload(record)
    saveAs(blob, `${record.firstName}_${record.lastName}_letter.pdf`)
  }

  const saveAll = async () => {
    const blobs = []
    setIsLoading(true)
    for (const record of data) {
      const blob = await handleDownload(record)
      blobs.push(blob)
    }
    await Merger(blobs)
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="relative">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 my-4 text-white shadow-md rounded-md "
              onClick={saveAll}
            >
              Download All
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 my-4 text-white shadow-md rounded-md "
              onClick={saveAll}
            >
              Delete Selected
            </button>
          </div>
          <DataTable dataRows={data} saveOne={saveOne} saveAll={saveAll} />
        </>
      )}
    </div>
  )
}

export default AdminTable
