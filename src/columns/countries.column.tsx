import { GridColDef } from "@mui/x-data-grid";

export const countriesColumn: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 200 },
  { field: "name", headerName: "Country Name", width: 120 },
  { field: "code", headerName: "Country Code", width: 120 },
];
