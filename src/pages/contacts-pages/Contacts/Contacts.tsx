import classes from "./Contacts.module.scss";
import { useSelector } from "react-redux";
import TableBase from "../../../components/ui/table/TableBase/TableBase";
import { contactSelectors } from "../../../store/contact/contact.selectors";
import { getContactsColumns } from "../../../columns/contacts.column";
import { useAppDispatch } from "../../../store";
import { ContactModel } from "../../../types/contact.type";
import { useCallback, useMemo, useState } from "react";
import { ActionColumn } from "../../../components/ui/table/ActionColumnBase/ActionColumnBase";
import { EditIcon, TrashIcon } from "../../../components/ui/Icons";
import { useNavigate } from "react-router-dom";
import { contactActions } from "../../../store/contact/contact.actions";
import { ApiResponse } from "../../../models/base/api-base";
import { Box, Typography } from "@mui/material";
import { ButtonPrimary } from "../../../components/ui/Button/ButtonPrimary";
import { modalActions } from "../../../store/modal/modal.actions";
import { ContactsFilter } from "./ContactsFilter/ContactsFilter";
import { RemoveContactByIdResponse } from "../../../models/contact/remove/removeContactById.response";
import { CONTACTS_PAGE_ROUTES } from "../../../routes/contacts-routes";

const Contacts = () => {
  const contacts = useSelector(contactSelectors.getContacts());
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const [contactList, setContactList] = useState<ContactModel[]>(contacts);

  // useEffect(() => {
  //   if (!contacts.length) dispatch(contactActions.getContactsThunk());
  // }, []);

  // useEffect(() => {
  //   if (!contactList.length) setContactList(contacts);
  // }, [contacts]);

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

    const response = (
      await dispatch(contactActions.removeContactByIdThunk(contact._id))
    ).payload as ApiResponse<RemoveContactByIdResponse>;

    if (!response.isSucceeded || !response.data?.content) return;

    setContactList((prev) =>
      prev.filter((contact) => contact._id !== response.data?.content)
    );
  }, []);

  const openAddUserModal = useCallback(() => {
    dispatch(modalActions.openAddContactModal());
  }, []);

  const handleSetContactList = useCallback(
    (contacts: ContactModel[]) => {
      setContactList(contacts);
    },
    [setContactList]
  );

  const actions: ActionColumn<ContactModel>[] = useMemo(() => {
    return [
      {
        actionFunction: (entity: ContactModel) =>
          nav(
            `${CONTACTS_PAGE_ROUTES.PAGES.CONTACT.FULL_ROUTE_NAME_PATH}/${entity._id}`
          ),
        icon: <EditIcon />,
      },
      {
        actionFunction: handleRowRemove,
        icon: <TrashIcon />,
      },
    ];
  }, [handleRowRemove]);

  return (
    <Box className={classes.container}>
      <Box className={classes.container__controller}>
        <Typography variant="h4">Contacts</Typography>
        <ButtonPrimary onClickFunction={openAddUserModal}>
          Add New Contact
        </ButtonPrimary>
      </Box>

      <ContactsFilter
        contacts={contacts}
        handleSetContactList={handleSetContactList}
      />

      <TableBase
        slug="contacts"
        columns={getContactsColumns({ handleBuyersFunction: handleOpenModal })}
        rows={contactList}
        actions={actions}
        pageSize={50}
      />
    </Box>
  );
};

export default Contacts;
