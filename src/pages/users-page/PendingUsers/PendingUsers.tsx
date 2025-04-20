import { userWaitlistApiService } from "../../../services/api/userWaitlist.api.service";
import { useCallback, useEffect, useMemo, useState } from "react";
import { UserWaitlistModel } from "../../../types/user-waitlist.type";
import TableBase from "../../../components/ui/table/TableBase/TableBase";
import { pendingUsersColumn } from "../../../columns/pending-users.column";
import { ActionColumn } from "../../../components/ui/table/ActionColumnBase/ActionColumnBase";
import { STYLES } from "../../../constants/style.constants";
import { ApproveUserStatusEnum } from "../../../enums/userWaitlist.enum";
import { Breadcrumb } from "../../../components/shared/Breadcrumb/Breadcrumb";

const PendingUsers = () => {
  const [userWaitlist, setUserWaitlist] = useState<UserWaitlistModel[]>([]);

  useEffect(() => {
    const loadUserWaitlist = async () => {
      const response = await userWaitlistApiService.get();
      if (!response.isSucceeded || !response.data?.content) return;

      setUserWaitlist(response.data.content);
    };

    loadUserWaitlist();
  }, []);

  const handleApprove = useCallback(
    async (pendingUser: UserWaitlistModel, status: ApproveUserStatusEnum) => {
      if (!userWaitlist.length) return;

      const response = await userWaitlistApiService.update({
        status,
        userId: pendingUser._id,
      });

      if (!response.isSucceeded || !response.data?.content) return;

      const updatedUser = response.data.content;

      setUserWaitlist((prevList) => {
        const newList = [...prevList];
        const index = newList.findIndex((user) => user._id === updatedUser._id);

        if (index === -1) return prevList;

        newList[index] = updatedUser;
        return newList;
      });
    },
    [userWaitlist]
  );

  const actionColumn: ActionColumn<UserWaitlistModel>[] = useMemo(() => {
    return [
      {
        actionFunction: (entity) =>
          handleApprove(entity, ApproveUserStatusEnum.APPROVED),
        text: "Approve",
        className: STYLES.CLASS_NAMES.BUTTONS.PRIMARY_BUTTON,
      },
      {
        actionFunction: (entity) =>
          handleApprove(entity, ApproveUserStatusEnum.REJECTED),
        text: "Reject",
        className: STYLES.CLASS_NAMES.BUTTONS.PRIMARY_BUTTON,
      },
    ];
  }, [userWaitlist]);

  return (
    <>
      <Breadcrumb text="Pending Users" />
      <TableBase
        slug="Pending users"
        columns={pendingUsersColumn}
        rows={userWaitlist}
        actions={actionColumn}
      />
    </>
  );
};

export default PendingUsers;
