import { GridColDef } from "@mui/x-data-grid";
import { dateUtilService } from "../utils/date.utils";
import { DateFormatsEnum } from "../enums/DateFormats.enum";
import { CreditTransactionModel } from "../types/credit-transaction.type";

export const creditTransactionsColumns: GridColDef<CreditTransactionModel>[] = [
  {
    field: "fullname",
    headerName: "Fullname",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="flex_align_center gap_0_5">
          <img
            src={params.row?.userInfo.imgUrl?.url || "/noavatar.png"}
            alt="user"
          />
          {params.row.userInfo.fullname}
        </div>
      );
    },
  },
  { field: "type", headerName: "Transaction Type", width: 130 },
  { field: "creditName", headerName: "Package Name", width: 130 },
  { field: "creditQuantity", headerName: "Credit Quantity", width: 130 },
  { field: "packagePrice", headerName: "Package Price", width: 130 },
  {
    field: "createdAt",
    headerName: "Transaction Date",
    width: 200,
    renderCell: (params) => {
      return (
        <div>
          {dateUtilService.getFormattedDate(
            params.row.createdAt,
            DateFormatsEnum.DD_MM_YYYY
          )}
        </div>
      );
    },
  },
];
