import { GridColDef } from "@mui/x-data-grid";
import { CompanyModel } from "../store/categoryManager/categoryManager-state";
import { NO_IMAGE_FALLBACK } from "../constants/image.constants";
import { Box } from "@mui/material";
import { CircularImage } from "../components/shared/CircularImage/CircularImage";
import { stringUtilService } from "../utils/string.utils";

export const companiesColumns: GridColDef<CompanyModel>[] = [
  {
    field: "title",
    headerName: "Company",
    width: 200,
    renderCell: (params) => {
      return (
        <Box className="flex_align_center gap_0_5">
          <CircularImage
            size={2}
            src={params.row.img || NO_IMAGE_FALLBACK}
            alt="category"
          />
          {params.row.company}
        </Box>
      );
    },
  },
  {
    field: "category",
    headerName: "Category",
    width: 200,
    renderCell: (params) => {
      return (
        <Box className="flex_align_center gap_0_5">
          {stringUtilService.getFirstLetterUppercase(params.row.category)}
        </Box>
      );
    },
  },
];
