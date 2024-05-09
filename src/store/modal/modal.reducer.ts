import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";
import { TableBaseProps } from "../../components/ui/table/TableBase/TableBase";
import { ModalState } from "./modal-state";
import { ContactApplyRequestInfo } from "../../types/agent-contact-request.type";

const initialState: ModalState = {
  addUserModal: { isOpen: false },
  tableModal: { isOpen: false },
  addContactModal: { isOpen: false },
  approveAgentContactModal: { isOpen: false },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // AddUserModal
    openAddUserModal: (state) => {
      state.addUserModal.isOpen = true;
    },
    closeAddUserModal: (state) => {
      state.addUserModal.isOpen = false;
    },

    // tableModal
    openTableModal: (state) => {
      state.tableModal.isOpen = true;
    },
    closeTableModal: (state) => {
      state.tableModal.isOpen = false;
      state.tableModal = initialState.tableModal;
    },

    // AddContactModal
    openAddContactModal: (state) => {
      state.addContactModal.isOpen = true;
    },
    closeAddContactModal: (state) => {
      state.addContactModal.isOpen = false;
      state.addContactModal = initialState.addContactModal;
    },

    // ApproveAgentContactModal
    openApproveAgentContactModal: (
      state,
      action: PayloadAction<ContactApplyRequestInfo>
    ) => {
      state.approveAgentContactModal.isOpen = true;
      if (!action.payload) return;
      state.approveAgentContactModal.modalPayload = action.payload;
    },
    closeApproveAgentContactModal: (state) => {
      state.approveAgentContactModal.isOpen = false;
      state.approveAgentContactModal = initialState.approveAgentContactModal;
    },

    setTableModalPayload<T>(
      state: ModalState,
      action: PayloadAction<TableBaseProps<T>>
    ) {
      state.tableModal.isOpen = true;
      state.tableModal.modalPayload = action.payload;
    },
  },
});

const modalReducer: Reducer<ModalState> = modalSlice.reducer;
export const userInitialState = initialState;
export default modalReducer;
