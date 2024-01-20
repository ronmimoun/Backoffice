import { GridColDef } from "@mui/x-data-grid";
import { CREDIT_VALUE } from "../constants/credit.constants";
import { userUtilService } from "../utils/user.utils";
import { dateUtilService } from "../utils/date.utils";

export const billingColumns: GridColDef[] = [
  {
    field: "fullname",
    headerName: "Fullname",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="flex_align_center gap_0_5">
          <img src={params.row?.imgUrl?.url || "/noavatar.png"} alt="user" />
          {params.row.username}
        </div>
      );
    },
  },
  { field: "address", headerName: "Address", width: 150 },
  { field: "credits", headerName: "Credits", width: 150 },
  {
    field: "totalBalance",
    headerName: "Total Balance",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="userListUser">
          {Number.isNaN(params.row.credits * CREDIT_VALUE)
            ? 0
            : params.row.credits * CREDIT_VALUE}
          $
        </div>
      );
    },
  },
  {
    field: "expenses",
    headerName: "Expenses",
    width: 150,
    renderCell: (params) => {
      return <div>{userUtilService.sumExpenses(params.row)}</div>;
    },
  },
  {
    field: "income",
    headerName: "Income",
    width: 150,
  },
  {
    field: "creditTransaction",
    headerName: "Date of last transaction",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="userListUser">
          {dateUtilService.formatMostRecentDate(
            params.row.creditTransactions,
            "createdAt"
          )}
        </div>
      );
    },
  },
];
