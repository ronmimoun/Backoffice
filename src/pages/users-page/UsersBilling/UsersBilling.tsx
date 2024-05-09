import { useSelector } from "react-redux";
import { billingColumns } from "../../../columns/billing.column";
import { userSelectors } from "../../../store/user/user.selectors";
import TableBase from "../../../components/ui/table/TableBase/TableBase";
import { useCallback, useMemo } from "react";
import { ActionColumn } from "../../../components/ui/table/ActionColumnBase/ActionColumnBase";
import { EditIcon } from "../../../components/ui/Icons/EditIcon";
import { UserModel } from "../../../types/user.type";
import { Breadcrumb } from "../../../components/shared/Breadcrumb/Breadcrumb";

export const UsersBilling = () => {
  const users = useSelector(userSelectors.getUsers());

  const handleRowEdit = useCallback(() => {
    console.log("Edit");
  }, []);

  const columnActions: ActionColumn<UserModel>[] = useMemo(() => {
    return [
      {
        actionFunction: handleRowEdit,
        icon: <EditIcon />,
      },
    ];
  }, []);

  return (
    <>
      <Breadcrumb text="Billing" />
      <TableBase
        slug="billing"
        columns={billingColumns}
        rows={users}
        actions={columnActions}
      />
    </>
  );
};
