import { useSelector } from "react-redux";
import { billingColumns } from "../../columns/billing.column";
import { userSelectors } from "../../store/user/user.selectors";
import DataTable from "../../components/dataTable/DataTable";
import { useCallback, useMemo } from "react";
import { ActionColumn } from "../../components/dataTable/ActionColumnBase/ActionColumnBase";
import { EditIcon } from "../../components/ui/Icons/EditIcon";
import { UserModel } from "../../types/user.type";

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
    <DataTable
      slug="billing"
      columns={billingColumns}
      rows={users}
      actions={columnActions}
    />
  );
};
