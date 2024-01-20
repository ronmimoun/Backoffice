import { useSelector } from "react-redux";
import { RenderByBoolean } from "../components/utils/RenderByBoolean/RenderByBoolean";
import { modalSelectors } from "../store/modal/modal.selectors";
import AddUserModal from "../components/modals/AddUserModal/AddUserModal";
import TableModalWrapper from "../components/modals/TableModal/TableModal";
import { AddContactModal } from "../components/modals/AddContactModal/AddContactModal";
import { ApproveAgentContactModal } from "../components/modals/ApproveAgentContactModal/ApproveAgentContactModal";

export const ModalsContainer = () => {
  const isAddUserModalOpen = useSelector(modalSelectors.isAddUserModalOpen());
  const isTableModalOpen = useSelector(modalSelectors.isTableModalOpen());
  const isAddContactModalOpen = useSelector(
    modalSelectors.isAddContactModalOpen()
  );
  const isApproveAgentContactModalOpen = useSelector(
    modalSelectors.isApproveAgentContactModalOpen()
  );

  return (
    <>
      <RenderByBoolean shouldRender={isAddUserModalOpen}>
        <AddUserModal />
      </RenderByBoolean>
      <RenderByBoolean shouldRender={isTableModalOpen}>
        <TableModalWrapper />
      </RenderByBoolean>
      <RenderByBoolean shouldRender={isAddContactModalOpen}>
        <AddContactModal />
      </RenderByBoolean>
      <RenderByBoolean shouldRender={isApproveAgentContactModalOpen}>
        <ApproveAgentContactModal />
      </RenderByBoolean>
    </>
  );
};
