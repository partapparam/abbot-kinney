import Airtable from "airtable"

// type NewContactData = {
//   firstName: string
//   lastName: string
//   email: string
//   permission: boolean
//   futureContact: boolean
//   letter?: string
// }

export const postForm = async (data) => {
  // example
  // https://api.airtable.com/v0/YOUR_BASE_ID/YOUR_TABLE_ID_OR_NAME
  const URL = `${import.meta.env.VITE_AIRTABLE_URL}${
    import.meta.env.VITE_AIRTABLE_BASE
  }/${import.meta.env.VITE_AIRTABLE_TABLE_LETTERS}`
  const body = {
    fields: data,
  }
  console.log(data)
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_TOKEN}`,
    },
    body: JSON.stringify(body),
  }
  try {
    const response = await fetch(URL, requestOptions)
    console.log(response)
    return response.status
  } catch (error) {
    console.log(error)
  }
}

export const updateLetterContent = async (data) => {
  // data will be an array of objects
  // const data = [
  //   {
  //     id: "",
  //     fields: {
  //       type: "",
  //       content: "",
  //     },
  //   },
  // ]
  const base = new Airtable({
    apiKey: import.meta.env.VITE_AIRTABLE_TOKEN,
  }).base(import.meta.env.VITE_AIRTABLE_BASE)

  return new Promise((resolve, reject) => {
    base(import.meta.env.VITE_AIRTABLE_NAME_EDITOR).update(
      data,
      function (err, records) {
        if (err) {
          console.error(err)
          reject(err)
          return
        }
        records.forEach(function (record) {
          console.log(record.get("type"))
        })
        resolve(records)
      }
    )
  })
}

export const getTableData = async () => {
  const base = new Airtable({
    apiKey: import.meta.env.VITE_AIRTABLE_TOKEN,
  }).base(import.meta.env.VITE_AIRTABLE_BASE)

  return new Promise((resolve, reject) => {
    const allCases = []

    base("columbia")
      .select({ sort: [{ field: "email", direction: "desc" }] })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            console.log(record)
            allCases.push({
              id: record._rawJson.id,
              ...record._rawJson.fields,
            })
          })
          fetchNextPage()
        },
        function done(err) {
          if (err) {
            reject(err)
          } else {
            resolve(allCases)
          }
        }
      )
  })
}

export const getAdminEditorContent = async (id: string) => {
  const base = new Airtable({
    apiKey: import.meta.env.VITE_AIRTABLE_TOKEN,
  }).base(import.meta.env.VITE_AIRTABLE_BASE)

  return new Promise((resolve, reject) => {
    base(import.meta.env.VITE_AIRTABLE_NAME_EDITOR).find(
      id,
      function (err, record) {
        if (err) {
          console.error(err)
          reject(err)
          return
        }
        // console.log("Retrieved", record)
        resolve(record.fields)
      }
    )
  })
}

export const getContent = async () => {
  const base = new Airtable({
    apiKey: import.meta.env.VITE_AIRTABLE_TOKEN,
  }).base(import.meta.env.VITE_AIRTABLE_BASE)

  return new Promise((resolve, reject) => {
    const allCases = []
    base(import.meta.env.VITE_AIRTABLE_NAME_EDITOR)
      .select()
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            allCases.push({
              id: record._rawJson.id,
              ...record._rawJson.fields,
            })
          })
          fetchNextPage()
        },
        function done(err) {
          if (err) {
            reject(err)
          } else {
            resolve(allCases)
          }
        }
      )
  })
}

export default {
  postForm,
  getTableData,
  getAdminEditorContent,
  getContent,
  updateLetterContent,
}
