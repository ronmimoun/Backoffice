import { userWaitlistApiService } from "../../services/api/userWaitlist.api.service";
import { useCallback, useEffect, useMemo, useState } from "react";
import { UserWaitlistModel } from "../../types/user-waitlist.type";
import DataTable from "../../components/dataTable/DataTable";
import { pendingUsersColumn } from "../../columns/pending-users.column";
import { ActionColumn } from "../../components/dataTable/ActionColumnBase/ActionColumnBase";
import { STYLES } from "../../constants/style.constants";
import { objectUtilService } from "../../utils/object.utils";
import { UserWaitlistEnum } from "../../enums/userWaitlist.enum";
import { Breadcrumb } from "../../components/shared/Breadcrumb/Breadcrumb";

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
    async (pendingUser: UserWaitlistModel, status: UserWaitlistEnum) => {
      if (!userWaitlist.length) return;

      const request = {
        pendingUser,
        status,
      };

      const response = await userWaitlistApiService.update(request);
      if (!response.isSucceeded || !response.data?.content) return;

      const updatedEntities = objectUtilService.updateObjectById(
        userWaitlist,
        response.data.content._id,
        response.data.content
      );

      setUserWaitlist(updatedEntities);
    },
    [userWaitlist]
  );

  const actionColumn: ActionColumn<UserWaitlistModel>[] = useMemo(() => {
    return [
      {
        actionFunction: (entity) =>
          handleApprove(entity, UserWaitlistEnum.APPROVED),
        text: "Approve",
        className: STYLES.CLASS_NAMES.BUTTONS.PRIMARY_BUTTON,
      },
      {
        actionFunction: (entity) =>
          handleApprove(entity, UserWaitlistEnum.REJECTED),
        text: "Reject",
        className: STYLES.CLASS_NAMES.BUTTONS.PRIMARY_BUTTON,
      },
    ];
  }, [userWaitlist]);

  return (
    <>
      <Breadcrumb text="Pending Users" />
      <DataTable
        slug="Pending users"
        columns={pendingUsersColumn}
        rows={userWaitlist}
        actions={actionColumn}
      />
    </>
  );
};

export default PendingUsers;
