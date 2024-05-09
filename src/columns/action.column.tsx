import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import ActionColumnBase, {
  ActionColumn,
} from "../components/ui/table/ActionColumnBase/ActionColumnBase";

type GetActionColumnBase<T> = {
  actions: ActionColumn<T>[];
};

export const getActionColumn = <T extends GridValidRowModel>({
  ...props
}: GetActionColumnBase<T>): GridColDef<T> => {
  return {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return <ActionColumnBase {...props} entity={params.row} />;
    },
  };
};
