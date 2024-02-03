import "./dataTable.scss";
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridToolbar,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { getActionColumn } from "../../columns/action.column";
import { useMemo } from "react";
import { ActionColumn } from "./ActionColumnBase/ActionColumnBase";
import { globalUtilService } from "../../utils/global.utils";

export type DataTablePropsBase<T> = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  actions?: ActionColumn<T>[];
  makeUniqueId?: boolean;
  pageSize?: number;
};

export type DataTableProps<T> = {} & DataGridProps & DataTablePropsBase<T>;

const DataTable = <T extends GridValidRowModel>({
  slug,
  rows,
  columns,
  actions,
  className,
  pageSize = 30,
  ...props
}: DataTableProps<T>) => {
  const memorizedColumns = useMemo(() => {
    return actions ? [...columns, getActionColumn({ actions })] : columns;
  }, [actions]);

  return (
    <div className="dataTable">
      <DataGrid
        {...props}
        className={`dataGrid ${className}`}
        getRowId={(row) =>
          props.makeUniqueId ? globalUtilService.generateUniqueId() : row._id
        }
        rows={rows}
        columns={memorizedColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
