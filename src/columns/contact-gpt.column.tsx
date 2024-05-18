import { GridColDef } from "@mui/x-data-grid";
import { ContactModel } from "../types/contact.type";

export const contactGptColumn: GridColDef<ContactModel>[] = [
  { field: "name", headerName: "Name", width: 220 },
  { field: "familyName", headerName: "Family Name", width: 220 },
  { field: "category", headerName: "Category", width: 220 },
  { field: "company", headerName: "Company", width: 220 },
  { field: "jobTitle", headerName: "Job Title", width: 220 },
];
