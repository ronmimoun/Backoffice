import {
  DataTableProps,
  DataTablePropsBase,
} from "../../components/dataTable/DataTable";
import { ContactModel } from "../../types/contact.type";

export type ModalState = {
  addUserModal: ModalBase;
  tableModal: ModalBase;
  addContactModal: ModalBase;
  approveAgentContactModal: ModalBase;
};

type ModalBase = {
  isOpen: boolean;
  modalPayload?: ModalPayload;
};

type ModalPayload = ContactModel | DataTablePropsBase;
