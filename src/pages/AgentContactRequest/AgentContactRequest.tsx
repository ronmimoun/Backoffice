import { Box } from "@mui/material";
import DataTable from "../../components/dataTable/DataTable";
import { useCallback, useEffect, useMemo, useState } from "react";
import { agentContactRequestApiService } from "../../services/api/agentContactRequest.api.service";
import { AgentContactRequestModel } from "../../types/agent-contact-request.type";
import { agentContactsRequestsColumn } from "../../columns/agent-contacts-requests.column";
import { ActionColumn } from "../../components/dataTable/ActionColumnBase/ActionColumnBase";
import { EditIcon, TrashIcon } from "../../components/ui/Icons";
import { useAppDispatch } from "../../store";
import { modalActions } from "../../store/modal/modal.actions";
import { Breadcrumb } from "../../components/shared/Breadcrumb/Breadcrumb";

const AgentContactRequest = () => {
  const [contactsRequests, setContactsRequests] = useState<
    AgentContactRequestModel[]
  >([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadContactRequest = async () => {
      const response = await agentContactRequestApiService.query();
      if (!response.isSucceeded || !response.data?.content) return;

      setContactsRequests(response.data.content);
    };

    loadContactRequest();
  }, []);

  const handleRowRemove = useCallback(
    async (contactRequest: AgentContactRequestModel) => {
      if (!window.confirm("Are you sure?")) return;

      const response = await agentContactRequestApiService.remove(
        contactRequest._id
      );

      if (!response.isSucceeded) return;

      setContactsRequests((state) =>
        state.filter((item) => item._id !== contactRequest._id)
      );
    },
    []
  );

  // const handleContactApprove = useCallback(
  //   async (contactRequest: AgentContactRequestModel) => {
  //     const response = await agentContactRequestApiService.update(
  //       contactRequest
  //     );

  //     if (!response.isSucceeded || !response.data?.content) return;

  //     setContactsRequests((state) =>
  //       state.map((item) => {
  //         if (item._id === response.data?.content._id) {
  //           item = response.data.content;
  //         }
  //         return item;
  //       })
  //     );
  //   },
  //   []
  // );

  const openModal = useCallback((contactRequest: AgentContactRequestModel) => {
    dispatch(modalActions.openApproveAgentContactModal(contactRequest.contact));
  }, []);

  const actions: ActionColumn<AgentContactRequestModel>[] = useMemo(() => {
    return [
      {
        actionFunction: handleRowRemove,
        icon: <TrashIcon />,
      },
      {
        actionFunction: openModal,
        icon: <EditIcon />,
      },
    ];
  }, []);

  return (
    <Box>
      <Breadcrumb text="Agent's Contacts" />
      <DataTable
        slug="agentsContactRequest"
        columns={agentContactsRequestsColumn}
        rows={contactsRequests}
        actions={actions}
      />
    </Box>
  );
};

export default AgentContactRequest;
