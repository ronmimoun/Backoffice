import { ContactModel } from "../../types/contact.type";
import { RootState } from "../root-state";

const isAddUserModalOpen = () => {
  return (state: RootState) => {
    return state.modal.addUserModal.isOpen;
  };
};

const isTableModalOpen = () => {
  return (state: RootState) => {
    return state.modal.tableModal.isOpen;
  };
};

const isAddContactModalOpen = () => {
  return (state: RootState) => {
    return state.modal.addContactModal.isOpen;
  };
};

const isApproveAgentContactModalOpen = () => {
  return (state: RootState) => {
    return state.modal.approveAgentContactModal.isOpen;
  };
};

const approveAgentContactModalPayload = () => {
  return (state: RootState): ContactModel => {
    return state.modal.approveAgentContactModal.modalPayload;
  };
};

const getTableModalPayload = () => {
  return (state: RootState) => {
    return state.modal.tableModal.modalPayload;
  };
};

export const modalSelectors = {
  isAddUserModalOpen,
  isTableModalOpen,
  isAddContactModalOpen,
  getTableModalPayload,
  isApproveAgentContactModalOpen,
  approveAgentContactModalPayload,
};
