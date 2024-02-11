import * as React from "react"
import { useMemo, useState, useCallback } from "react"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import DeleteIcon from "@mui/icons-material/Delete"
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline"

export default function DataTable({ dataRows }) {
  const [rows, setRows] = useState(dataRows)
  // whats the use of this set timeout
  const deleteUser = useCallback(
    (id) => () => {
      setTimeout(() => {
        console.log("this is being deleted", id)
        setRows((prevRows) => prevRows.filter((row) => row.id !== id))
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
      { field: "id", headerName: "ID", width: 20 },
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
        field: "actions",
        type: "actions",
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            key={params.id}
            icon={<DownloadForOfflineIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
          />,
          <GridActionsCellItem
            key={params.id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={download(params.id)}
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
        rows={dataRows}
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
