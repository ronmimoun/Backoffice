import { GridColDef } from "@mui/x-data-grid";
import { AgentContactRequestModel } from "../types/agent-contact-request.type";
import { NO_IMAGE_FALLBACK } from "../constants/image.constants";
import { Box, Typography } from "@mui/material";
import { dateUtilService } from "../utils/date.utils";

export const agentContactsRequestsColumn: GridColDef<AgentContactRequestModel>[] =
  [
    {
      field: "agentName",
      headerName: "Agent Name",
      width: 200,
      renderCell: (params) => {
        return (
          <Box className={"flex_align_center gap_0_5"}>
            <img
              src={params.row.contact.agent?.imgUrl || NO_IMAGE_FALLBACK}
              alt=""
            />
            <Typography variant="body1">
              {params.row.contact.agent?.fullname}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "isApproved",
      headerName: "Approval Status",
      width: 120,
    },
    {
      field: "contactName",
      headerName: "Contact Name",
      width: 200,
      renderCell: (params) => {
        return (
          <Typography variant="body1">
            {`${params.row.contact.name} ${params.row.contact.familyName}`}
          </Typography>
        );
      },
    },
    {
      field: "contactCompany",
      headerName: "Contact Company",
      width: 200,
      renderCell: (params) => {
        return (
          <Typography variant="body1">
            {`${params.row.contact.company}`}
          </Typography>
        );
      },
    },
    {
      field: "contactTitle",
      headerName: "Contact Title",
      width: 120,
      renderCell: (params) => {
        return (
          <Typography variant="body1" className="contactListItem">
            {`${params.row.contact.jobTitle}`}
          </Typography>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 120,
      renderCell: (params) => {
        return (
          <Typography variant="body1">
            {dateUtilService.getFormattedDate(params.row.createdAt)}
          </Typography>
        );
      },
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 120,
      renderCell: (params) => {
        return (
          <Typography variant="body1">
            {params.row.updatedAt
              ? dateUtilService.getFormattedDate(params.row.updatedAt)
              : "Not updated lately"}
          </Typography>
        );
      },
    },
  ];
