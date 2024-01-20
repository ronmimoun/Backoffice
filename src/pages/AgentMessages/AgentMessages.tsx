import DataTable from "../../components/dataTable/DataTable";
import { useEffect, useMemo, useState } from "react";
import { agentMessageApiService } from "../../services/api/agentMessage.api.service";
import {
  agentMessageColumns,
  agentMessageModalColumns,
} from "../../columns/agent-messages.column";
import { UserModel } from "../../types/user.type";
import { useAppDispatch } from "../../store";
import { modalActions } from "../../store/modal/modal.actions";
import { ActionColumn } from "../../components/dataTable/ActionColumnBase/ActionColumnBase";
import { STYLES } from "../../constants/style.constants";
import { AgentMessageModel } from "../../types/agent-message.type";

const AgentMessages = () => {
  const [agentMessages, setAgentMessages] = useState<UserModel[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadAgentMessages = async () => {
      const response = await agentMessageApiService.get();
      if (!response.isSucceeded || !response.data?.content) return;

      setAgentMessages(response.data.content);
    };

    loadAgentMessages();
  }, []);

  const handleOpenModal = (selectedRowId: string) => {
    const selectedRow = agentMessages.find(
      (user) => user._id === selectedRowId
    );

    if (!selectedRow) return;

    dispatch(
      modalActions.setTableModalPayload({
        slug: "Agent Message Details",
        columns: agentMessageModalColumns,
        rows: selectedRow.agentMessages,
      })
    );
  };

  const actions: ActionColumn<AgentMessageModel>[] = useMemo(() => {
    return [
      {
        actionFunction: (entityId) => handleOpenModal(entityId._id),
        text: "See agent messages",
        className: STYLES.CLASS_NAMES.BUTTONS.PRIMARY_BUTTON,
      },
    ];
  }, [agentMessages]);

  return (
    <DataTable
      slug="topups"
      columns={agentMessageColumns}
      rows={agentMessages}
      actions={actions}
    />
  );
};

export default AgentMessages;
