import classes from "./TableModal.module.scss";
import { GridColDef } from "@mui/x-data-grid";
import TableBase from "../../table/TableBase/TableBase";
import { ModalBase } from "../ModalBase/ModalBase";
import { useSelector } from "react-redux";
import { modalSelectors } from "../../../../store/modal/modal.selectors";
import { useCallback } from "react";
import { useAppDispatch } from "../../../../store";
import { modalActions } from "../../../../store/modal/modal.actions";
import { ActionColumn } from "../../table/ActionColumnBase/ActionColumnBase";

type TableModalProps<T> = {
  slug: string;
  columns: GridColDef[] & readonly GridColDef<any>[];
  rows: T[];
  actions?: ActionColumn<T>[];
  makeUniqueId?: boolean;
};

export const TableModal = <T extends object>({
  ...props
}: TableModalProps<T>) => {
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(modalActions.closeTableModal());
  }, []);

  return (
    <ModalBase open={true} onClose={handleClose} title={props.slug}>
      <TableBase {...props} className={classes.modal_content} />
    </ModalBase>
  );
};

const TableModalWrapper = () => {
  const tableModalPayload = useSelector(modalSelectors.getTableModalPayload());
  if (!tableModalPayload) return <></>;

  return <TableModal {...tableModalPayload} />;
};
export default TableModalWrapper;
