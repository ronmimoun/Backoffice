import { Box, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { feedbacksApiService } from "../../services/api/feedbacks.api.service";
import { UserReviewModel } from "../../types/feedback.type";
import DataTable from "../../components/dataTable/DataTable";
import {
  contactsFeedbacksColumn,
  userReviewsColumns,
} from "../../columns/contacts-feedbacks.column";
import { ActionColumn } from "../../components/dataTable/ActionColumnBase/ActionColumnBase";
import { STYLES } from "../../constants/style.constants";
import { useAppDispatch } from "../../store";
import { modalActions } from "../../store/modal/modal.actions";

const ContactsFeedback = () => {
  const [reviews, setReviews] = useState<UserReviewModel[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadFeedbacks = async () => {
      const response = await feedbacksApiService.get();
      if (!response.isSucceeded || !response.data?.content) return;
      setReviews(response.data.content);
    };

    loadFeedbacks();
  }, []);

  const handleOpenModal = useCallback((review: UserReviewModel) => {
    dispatch(
      modalActions.setTableModalPayload({
        slug: "User Feedbacks",
        columns: contactsFeedbacksColumn,
        rows: review.feedbacks,
      })
    );
  }, []);

  const actions: ActionColumn<UserReviewModel>[] = useMemo(() => {
    return [
      {
        actionFunction: (entity) => handleOpenModal(entity),
        text: "Open reviews",
        className: STYLES.CLASS_NAMES.BUTTONS.PRIMARY_BUTTON,
      },
    ];
  }, []);

  return (
    <Box>
      <Typography variant="h4" className="mb-1">
        Users Reviews
      </Typography>
      <DataTable
        slug="feedbacks"
        columns={userReviewsColumns}
        rows={reviews}
        actions={actions}
        makeUniqueId={true}
      />
    </Box>
  );
};

export default ContactsFeedback;
