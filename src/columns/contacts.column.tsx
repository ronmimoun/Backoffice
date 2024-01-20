import { GridColDef } from "@mui/x-data-grid";
import { ContactModel } from "../types/contact.type";
import { NO_IMAGE_FALLBACK } from "../constants/image.constants";
import { UserModel } from "../types/user.type";
import { userUtilService } from "../utils/user.utils";
import { DateFormatsEnum } from "../enums/DateFormats.enum";
import { dateUtilService } from "../utils/date.utils";

type getContactsColumnsProps = {
  handleBuyersFunction: (contact: ContactModel) => void;
};

export const getContactsColumns = ({
  handleBuyersFunction,
}: getContactsColumnsProps): GridColDef<ContactModel>[] => [
  {
    field: "company",
    headerName: "Company",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="flex_align_center gap_0_5">
          <img src={params.row?.img?.url || NO_IMAGE_FALLBACK} alt="" />
          {params.row.company}
        </div>
      );
    },
  },
  { field: "category", headerName: "Category", width: 220 },
  { field: "jobTitle", headerName: "Job Title", width: 220 },
  { field: "name", headerName: "Name", width: 220 },
  { field: "familyName", headerName: "Family Name", width: 220 },
  {
    field: "price",
    headerName: "Price",
    width: 160,
    renderCell: (params) => {
      return <div className="contactListItem">{params.row.price}$</div>;
    },
  },
  {
    field: "buyer",
    headerName: "Buyers",
    width: 160,
    renderCell: (params) => {
      return (
        <div
          className="contactListItem"
          onClick={() => handleBuyersFunction(params.row)}
        >
          {params.row.transactionHistory.length}
        </div>
      );
    },
  },
];

export const contactTransactionsColumns: GridColDef<UserModel>[] = [
  {
    field: "user",
    headerName: "User",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="flex_align_center gap_0_5">
          <img src={params.row?.imgUrl?.url || NO_IMAGE_FALLBACK} alt="" />
          {params.row.fullname}
        </div>
      );
    },
  },
  {
    field: "date",
    headerName: "Purchase date",
    width: 160,
    renderCell: (params) => {
      const purchaseDate = userUtilService.getUserContactTransactionById(
        params.row
      );
      return (
        <div>
          {purchaseDate &&
            dateUtilService.getFormattedDate(
              new Date(purchaseDate.createdAt),
              DateFormatsEnum.DD_MM_YYYY
            )}
        </div>
      );
    },
  },
];
