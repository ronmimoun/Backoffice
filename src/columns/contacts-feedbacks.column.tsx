import { GridColDef } from "@mui/x-data-grid";
import { FeedbackModel, UserReviewModel } from "../types/feedback.type";
import { Box, Tooltip, Typography } from "@mui/material";
import { NO_IMAGE_FALLBACK } from "../constants/image.constants";
import { dateUtilService } from "../utils/date.utils";

export const userReviewsColumns: GridColDef<UserReviewModel>[] = [
  {
    field: "userName",
    headerName: "Username",
    width: 200,
    renderCell: (params) => {
      return <Box>{params.row.username}</Box>;
    },
  },
];

export const contactsFeedbacksColumn: GridColDef<FeedbackModel>[] = [
  {
    field: "company",
    headerName: "Company",
    width: 150,
    renderCell: (params) => {
      return (
        <Box className="flex_align_center gap_0_5">
          <img
            src={params.row.contact.img.url || NO_IMAGE_FALLBACK}
            alt="user"
          />
          <Typography variant="body1">{params.row.contact.company}</Typography>
        </Box>
      );
    },
  },
  {
    field: "category",
    headerName: "Category",
    width: 150,
    renderCell: (params) => {
      return <Box>{params.row.contact.category}</Box>;
    },
  },
  {
    field: "jobTitle",
    headerName: "Job Title",
    width: 150,
    renderCell: (params) => {
      return <Box>{params.row.contact.jobTitle}</Box>;
    },
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 150,
    renderCell: (params) => {
      return (
        <Box>
          {dateUtilService.getFormattedDate(new Date(params.row.createdAt))}
        </Box>
      );
    },
  },
  {
    field: "comment",
    headerName: "Messages",
    width: 150,
    renderCell: (params) => {
      return (
        <Tooltip title={`${params.row.comment}`}>
          <Typography variant="body1" className="text single-line">
            {params.row.comment}
          </Typography>
        </Tooltip>
      );
    },
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 90,
    renderCell: (params) => {
      return <Box>{params.row.rating}</Box>;
    },
  },
];
