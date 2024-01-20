import { GridColDef } from "@mui/x-data-grid";
import { UserWaitlistModel } from "../types/user-waitlist.type";

export const pendingUsersColumn: GridColDef<UserWaitlistModel>[] = [
  {
    field: "fullname",
    headerName: "Fullname",
    width: 120,
  },
  {
    field: "username",
    headerName: "Username",
    width: 120,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },
  {
    field: "approveStatus",
    headerName: "Approve Status",
    width: 160,
  },
];
