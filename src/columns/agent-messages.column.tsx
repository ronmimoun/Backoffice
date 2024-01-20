import { GridColDef } from "@mui/x-data-grid";
import { UserModel } from "../types/user.type";
import { NO_IMAGE_FALLBACK } from "../constants/image.constants";
import { dateUtilService } from "../utils/date.utils";
import { DateFormatsEnum } from "../enums/DateFormats.enum";
import { Tooltip } from "@mui/material";
import { AgentMessageModel } from "../types/agent-message.type";

export const agentMessageColumns: GridColDef<UserModel>[] = [
  {
    field: "userName",
    headerName: "Username",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="flex_align_center gap_0_5">
          <img src={params.row?.imgUrl?.url || NO_IMAGE_FALLBACK} alt="user" />
          {params.row.fullname}
        </div>
      );
    },
  },
];

export const agentMessageModalColumns: GridColDef<AgentMessageModel>[] = [
  {
    field: "category",
    headerName: "Category ",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="flex_align_center gap_0_5">
          <img
            src={params.row?.contact.img?.url || NO_IMAGE_FALLBACK}
            alt="user"
          />
          {params.row.contact.category}
        </div>
      );
    },
  },
  {
    field: "company",
    headerName: "Company ",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="flex_align_center">{params.row.contact.company}</div>
      );
    },
  },
  {
    field: "jobTitle",
    headerName: "Job Title",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="flex_align_center">{params.row.contact.jobTitle}</div>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="flex_align_center">
          {dateUtilService.getFormattedDate(
            new Date(params.row.createdAt),
            DateFormatsEnum.DD_MM_YYYY
          )}
        </div>
      );
    },
  },
  {
    field: "UserCategory",
    headerName: "User Category",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="flex_align_center mb-0">{params.row.userCategory}</p>
      );
    },
  },
  {
    field: "UserCompany",
    headerName: "User Company",
    width: 150,
    renderCell: (params) => {
      return <p className="flex_align_center mb-0">{params.row.userCompany}</p>;
    },
  },
  {
    field: "UserJobTitle",
    headerName: "User Job Title",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="flex_align_center mb-0">{params.row.userJobTitle}</p>
      );
    },
  },
  {
    field: "UserLinkedInUrl",
    headerName: "User LinkedIn",
    width: 150,
    renderCell: (params) => {
      return (
        <Tooltip title={`${params.row.userLinkedInUrl}`}>
          <p className="flex_align_center mb-0">{params.row.userLinkedInUrl}</p>
        </Tooltip>
      );
    },
  },
  {
    field: "message",
    headerName: "Message",
    width: 150,
    renderCell: (params) => {
      return (
        <Tooltip
          className="flex_align_center mb-0"
          title={`${params.row.message}`}
        >
          <p>{params.row.message}</p>
        </Tooltip>
      );
    },
  },
];
