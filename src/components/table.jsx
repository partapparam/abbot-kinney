import * as React from "react"
import { useMemo, useState, useCallback, useEffect } from "react"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import DeleteIcon from "@mui/icons-material/Delete"
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline"

export default function DataTable({ dataRows, saveOne, saveAll }) {
  const [rd, setRd] = useState([])
  const [selected, setSelected] = []
  // Set the initial state of the data for grid
  useEffect(() => {
    setRd(dataRows)
  }, [dataRows])
  // whats the use of this set timeout
  const deleteUser = useCallback(
    (id) => () => {
      setTimeout(() => {
        console.log("this is being deleted", id)
        setRd((prevRows) => prevRows.filter((row) => row.id !== id))
      })
    },
    []
  )
  // what return a callback function
  const download = useCallback(
    (id) => () => {
      console.log("this is downloading", id)
    },
    []
  )
  const columns = useMemo(
    () => [
      {
        field: "firstName",
        headerName: "First Name",
        width: 130,
        sortable: true,
      },
      {
        field: "lastName",
        headerName: "Last Name",
        width: 130,
        sortable: true,
      },
      { field: "email", headerName: "Email", width: 200, sortable: true },
      {
        field: "permission",
        headerName: "Permission",
        width: 90,
        type: "boolean",
        sortable: false,
      },
      {
        field: "futureContact",
        headerName: "Contact",
        width: 90,
        type: "boolean",
        sortable: false,
      },
      {
        field: "download",
        type: "actions",
        width: 140,
        renderHeader: () => {
          return (
            <div>
              <button className="font-bold" onClick={saveAll}>
                Download
              </button>
            </div>
          )
        },
        getActions: (params) => [
          <GridActionsCellItem
            key={`download-${params.id}`}
            icon={<DownloadForOfflineIcon />}
            label="Delete"
            onClick={saveOne}
          />,
        ],
      },
      {
        field: "delete",
        type: "actions",
        width: 140,
        renderHeader: () => {
          return (
            <div>
              <button className="font-bold">Delete</button>
            </div>
          )
        },
        getActions: (params) => [
          <GridActionsCellItem
            key={`delete-${params.id}`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
          />,
        ],
      },
    ],
    [deleteUser, download]
  )

  const handleChange = (rowSelectionModel) => {
    console.log(rowSelectionModel)
  }
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rd}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20, 50]}
        checkboxSelection
        onRowSelectionModelChange={handleChange}
      />
    </div>
  )
}
