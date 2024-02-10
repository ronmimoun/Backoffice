import { GridColDef } from "@mui/x-data-grid";
import { JobTitleModel } from "../store/categoryManager/categoryManager-state";
import { NO_IMAGE_FALLBACK } from "../constants/image.constants";
import { Box } from "@mui/material";
import { CircularImage } from "../components/shared/CircularImage/CircularImage";

export const jobTitlesColumn: GridColDef<JobTitleModel>[] = [
  {
    field: "title",
    headerName: "Title",
    width: 200,
    renderCell: (params) => {
      return (
        <Box className="flex_align_center gap_0_5">
          <CircularImage
            size={2}
            src={params.row.img || NO_IMAGE_FALLBACK}
            alt="category"
          />
          {params.row.title}
        </Box>
      );
    },
  },
];
