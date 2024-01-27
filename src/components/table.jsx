import React, { useEffect, useState } from "react"

import { alpha } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import TableSortLabel from "@mui/material/TableSortLabel"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
// import DeleteIcon from "@mui/icons-material/Delete"
// import FilterListIcon from "@mui/icons-material/FilterList"
import { visuallyHidden } from "@mui/utils"

export const MatTableBulkDelete = () => {
  const [mode, setMode] = useState("add")
  const [options, setOptions] = useState(createOptions(mode))

  useEffect(() => {
    setOptions(createOptions(mode))
  }, [mode])

  return (
    <div>
      <Grid container spacing={2} style={{ marginBottom: 16 }}>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            disabled={mode !== "delete"}
            onClick={() => {
              console.log("data", JSON.stringify(data, null, 2))

              // get data that has been checked
              const checkedData = data.filter(
                (datum) => datum.tableData.checked === true
              )
              console.log(
                "MatTableBulkDelete -> checkedData",
                JSON.stringify(checkedData, null, 2)
              )

              // checked data with id
              const checkedIds = checkedData
                .filter((datum) => datum.id)
                .map(({ id }) => id)
              console.log(
                "MatTableBulkDelete -> checkedIds",
                JSON.stringify(checkedIds, null, 2)
              )

              // checked data without ids
              const checkedNonIds = checkedData.filter((datum) => !datum.id)
              console.log(
                "MatTableBulkDelete -> checkedNonIds",
                JSON.stringify(checkedNonIds, null, 2)
              )

              // TODO
              // Mutate checkedIds
              // Add checkedNonIds back to data (which will be updated after deletion mutation)

              setMode("add")
            }}
          >
            Save Deletions
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            disabled={mode !== "delete"}
            onClick={() => {
              setMode("add")
            }}
          >
            Cancel Deletions
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            disabled={mode === "delete"}
            onClick={() => {
              setMode("delete")
            }}
          >
            Bulk Delete
          </Button>
        </Grid>
      </Grid>
      <MaterialTable
        columns={columns}
        data={data}
        options={options}
        title="Material Table Bulk Delete Example"
      />
    </div>
  )
}

const columns = [
  {
    field: "id",
    title: "Id",
  },
  {
    field: "code",
    title: "Code",
  },
  {
    field: "name",
    title: "Name",
  },
]

const data = [
  {
    id: 1,
    code: "Code 1",
    name: "Name 1",
  },
  {
    id: 2,
    code: "Code 2",
    name: "Name 2",
  },
  {
    code: "Code 3",
    name: "Name 3",
  },
  {
    code: "Code 4",
    name: "Name 4",
  },
]

const createOptions = (mode) => {
  if (mode === "delete") {
    return {
      selection: true,
    }
  }
  return {}
}
