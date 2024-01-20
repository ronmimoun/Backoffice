import classes from "./Contacts.module.scss";
import { useSelector } from "react-redux";
import DataTable from "../../components/dataTable/DataTable";
import { contactSelectors } from "../../store/contact/contact.selectors";
import { getContactsColumns } from "../../columns/contacts.column";
import { useAppDispatch } from "../../store";
import { ContactModel } from "../../types/contact.type";
import { useCallback, useMemo } from "react";
import { ActionColumn } from "../../components/dataTable/ActionColumnBase/ActionColumnBase";
import { EditIcon, TrashIcon } from "../../components/ui/Icons";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes.constants";
import { contactActions } from "../../store/contact/contact.actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "../../models/base/api-base";
import { RemoveContactByIdThunkResponse } from "../../store/contact/contact-thunks/removeContactByIdThunk";
import { Box, Typography } from "@mui/material";
import { ButtonPrimary } from "../../components/ui/Button/ButtonPrimary";
import { modalActions } from "../../store/modal/modal.actions";

const Contacts = () => {
  const contacts = useSelector(contactSelectors.getContacts());
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  // const getUserIdArray = useCallback(
  //   (transactionHistory: TransactionHistoryModel[]) => {
  //     if (!transactionHistory.length) return [];
  //     const usersIds: string[] = [];
  //     transactionHistory.forEach((trans) => {
  //       // if (usersIds.find((id) => id === trans.userId)) return;
  //       usersIds.push(trans.userId);
  //     });
  //     return usersIds;
  //   },
  //   []
  // );

  const handleOpenModal = async (contact: ContactModel) => {
    console.log("contact", contact.transactionHistory);

    // const response =
    //   await contactTransactionApiService.getUsersTransactionsByContactId({
    //     usersId: getUserIdArray(contact.transactionHistory),
    //   });

    // if (!response.isSucceeded || !response.data?.content) return;

    // console.log("response", response);

    // dispatch(
    //   modalActions.setTableModalPayload({
    //     slug: "Contact buyers",
    //     columns: contactTransactionsColumns,
    //     rows: response.data.content,
    //     makeUniqueId: true,
    //   })
    // );
  };

  const handleRowRemove = useCallback(async (contact: ContactModel) => {
    if (!window.confirm("Are you sure?")) return;

    (await dispatch(
      contactActions.removeContactByIdThunk(contact._id)
    )) as PayloadAction<ApiResponse<RemoveContactByIdThunkResponse>>;
  }, []);

  const openAddUserModal = useCallback(() => {
    dispatch(modalActions.openAddContactModal());
  }, []);

  const actions: ActionColumn<ContactModel>[] = useMemo(() => {
    return [
      {
        actionFunction: (entity: ContactModel) =>
          nav(`${ROUTES.CONTACTS_PAGE.FULL_ROUTE_NAME}/${entity._id}`),
        icon: <EditIcon />,
      },
      {
        actionFunction: handleRowRemove,
        icon: <TrashIcon />,
      },
    ];
  }, []);

  return (
    <Box className={classes.container}>
      <Box className={classes.container__controller}>
        <Typography variant="h4">Contacts</Typography>
        <ButtonPrimary onClickFunction={openAddUserModal}>
          Add New Contact
        </ButtonPrimary>
      </Box>
      <DataTable
        slug="contacts"
        columns={getContactsColumns({ handleBuyersFunction: handleOpenModal })}
        rows={contacts}
        actions={actions}
      />
    </Box>
  );
};

export default Contacts;
