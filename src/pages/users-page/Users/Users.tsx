import classes from "./Users.module.scss";
import TableBase from "../../../components/ui/table/TableBase/TableBase";
import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { PayloadAction } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useAppDispatch } from "../../../store";
import { userSelectors } from "../../../store/user/user.selectors";
import { UserModel } from "../../../types/user.type";
import { userActions } from "../../../store/user/user.actions";
import { ApiResponse } from "../../../models/base/api-base";
import { RemoveUserResponse } from "../../../models/user/remove/removeUser.response";
import { modalActions } from "../../../store/modal/modal.actions";
import { ActionColumn } from "../../../components/ui/table/ActionColumnBase/ActionColumnBase";
import { EditIcon, TrashIcon } from "../../../components/ui/Icons";
import { ButtonPrimary } from "../../../components/ui/Button/ButtonPrimary";
import { columns } from "../../../columns/users.column";
import { USERS_PAGE_ROUTES } from "../../../routes/users-routes";

const Users = () => {
  const users = useSelector(userSelectors.getUsers());
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRowRemove = useCallback(async (entity: UserModel) => {
    if (!window.confirm("Are you sure?")) return;
    (await dispatch(
      userActions.removeUserThunk({ userId: entity._id })
    )) as PayloadAction<ApiResponse<RemoveUserResponse>>;
  }, []);

  const openAddUserModal = useCallback(() => {
    dispatch(modalActions.openAddUserModal());
  }, []);

  const actions: ActionColumn<UserModel>[] = useMemo(() => {
    return [
      {
        actionFunction: handleRowRemove,
        icon: <TrashIcon />,
      },
      {
        actionFunction: (entity: UserModel) =>
          navigate(
            `${USERS_PAGE_ROUTES.PAGES.USER.FULL_ROUTE_NAME_PATH}/${entity._id}`
          ),
        icon: <EditIcon />,
      },
    ];
  }, []);

  return (
    <Box className={classes.users}>
      <Box className={classes.info}>
        <Typography variant="h4">Users</Typography>
        <ButtonPrimary onClickFunction={openAddUserModal}>
          Add New User
        </ButtonPrimary>
      </Box>
      <TableBase
        slug="users"
        columns={columns}
        rows={users}
        actions={actions}
      />
    </Box>
  );
};

export default Users;
