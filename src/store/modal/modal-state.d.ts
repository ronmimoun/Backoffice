import {
  TableProps,
  TableBaseProps,
} from "../../components/ui/table/TableBase/TableBase";
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

type ModalPayload = ContactModel | TableBaseProps;
