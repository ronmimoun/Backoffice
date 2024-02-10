import DataTable from "../../components/dataTable/DataTable";
import { useSelector } from "react-redux";
import { categoryManagerSelectors } from "../../store/categoryManager/categoryManager.selectors";
import { ActionColumn } from "../../components/dataTable/ActionColumnBase/ActionColumnBase";
import { useCallback, useMemo, useState } from "react";
import { EditIcon, TrashIcon } from "../../components/ui/Icons";
import { useAppDispatch } from "../../store";
import { Box } from "@mui/material";
import { JobTitleModel } from "../../store/categoryManager/categoryManager-state";
import { jobTitlesColumn } from "../../columns/job-title.column";
import { AddJobTitleModal } from "../../components/modals/AddJobTitleModal/AddJobTitleModal";
import { AddJobTitleFormType } from "../../form/schemas/addJobTitleSchema";
import { categoryManagerActions } from "../../store/categoryManager/categoryManager.actions";
import { UpdateJobTitleRequest } from "../../models/job-title/update/updateJobTitle.request";
import { ApiResponse } from "../../models/base/api-base";
import { UpdateJobTitleResponse } from "../../models/job-title/update/updateJobTitle.response";

const JobTitles = () => {
  const { jobTitles } = useSelector(categoryManagerSelectors.categoryManager());
  const [selectedJobTitle, setSelectedJobTitle] =
    useState<JobTitleModel | null>(null);
  const dispatch = useAppDispatch();

  const handleRemoveJobTitle = useCallback(async (jobTitle: JobTitleModel) => {
    if (!window.confirm("Are you sure?")) return;
    dispatch(categoryManagerActions.removeJobTitleThunk(jobTitle._id));
  }, []);

  const handleEditJobTitle = useCallback(
    async (form: AddJobTitleFormType) => {
      if (!selectedJobTitle) return;

      const payload: UpdateJobTitleRequest = {
        title: form.jobTitleName,
        value: form.jobTitleName,
        _id: selectedJobTitle._id,
        img: selectedJobTitle.img,
      };

      const response = (
        await dispatch(categoryManagerActions.updateJobTitleThunk(payload))
      ).payload as ApiResponse<UpdateJobTitleResponse>;

      if (!response.isSucceeded || !response.data?.content) return;
      handleClose();
    },
    [selectedJobTitle]
  );

  const handleClose = useCallback(() => {
    setSelectedJobTitle(null);
  }, []);

  const actionColumns = useMemo((): ActionColumn<JobTitleModel>[] => {
    return [
      {
        actionFunction: handleRemoveJobTitle,
        icon: <TrashIcon />,
      },
      {
        actionFunction: (category) => setSelectedJobTitle(category),
        icon: <EditIcon />,
      },
    ];
  }, [handleRemoveJobTitle]);

  return (
    <Box>
      <AddJobTitleModal
        selectedJobTitle={selectedJobTitle}
        open={!!selectedJobTitle}
        handleClose={handleClose}
        handleSubmit={handleEditJobTitle}
      />
      <DataTable
        slug="categories"
        columns={jobTitlesColumn}
        rows={jobTitles}
        pageSize={50}
        actions={actionColumns}
      />
    </Box>
  );
};

export default JobTitles;
