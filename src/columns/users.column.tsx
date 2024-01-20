import { GridColDef } from "@mui/x-data-grid";
import { NO_IMAGE_FALLBACK } from "../constants/image.constants";

export const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "user",
    headerName: "User",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="flex_align_center gap_0_5">
          <img src={params.row?.imgUrl?.url || NO_IMAGE_FALLBACK} alt="user" />
          {params.row.username}
        </div>
      );
    },
  },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "isAdmin",
    headerName: "Admin Status",
    width: 120,
  },
  {
    field: "transaction",
    headerName: "Transaction Volume",
    width: 160,
  },
];
