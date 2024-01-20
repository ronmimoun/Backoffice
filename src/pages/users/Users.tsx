import classes from "./Users.module.scss";
import DataTable from "../../components/dataTable/DataTable";
import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { userSelectors } from "../../store/user/user.selectors";
import { useAppDispatch } from "../../store";
import { userActions } from "../../store/user/user.actions";
import { columns } from "../../columns/users.column";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "../../models/base/api-base";
import { RemoveUserResponse } from "../../models/user/remove/removeUser.response";
import { modalActions } from "../../store/modal/modal.actions";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes.constants";
import { ActionColumn } from "../../components/dataTable/ActionColumnBase/ActionColumnBase";
import { EditIcon, TrashIcon } from "../../components/ui/Icons";
import { UserModel } from "../../types/user.type";
import { Box, Typography } from "@mui/material";
import { ButtonPrimary } from "../../components/ui/Button/ButtonPrimary";

const Users = () => {
  const users = useSelector(userSelectors.getUsers());
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!users.length) dispatch(userActions.getUsersThunk());
  }, []);

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
          navigate(`${ROUTES.USERS_PAGE.FULL_ROUTE_NAME}/${entity._id}`),
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
      <DataTable
        slug="users"
        columns={columns}
        rows={users}
        actions={actions}
      />
    </Box>
  );
};

export default Users;
