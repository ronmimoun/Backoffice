import { Box } from "@mui/material";
import { ModalBase } from "../../../ui/modals/ModalBase/ModalBase";
import { useCallback, useEffect, useState } from "react";
import { ButtonPrimary } from "../../../ui/Button/ButtonPrimary";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../../ui/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../../../store";
import { Breadcrumb } from "../../../shared/Breadcrumb/Breadcrumb";
import { JobTitleModel } from "../../../../store/categoryManager/categoryManager-state";
import { RenderByBoolean } from "../../../shared/RenderByBoolean/RenderByBoolean";
import {
  ADD_JOB_TITLE_CONFIG,
  ADD_JOB_TITLE_SCHEMA,
  AddJobTitleFormType,
} from "../../../../form/schemas/addJobTitleSchema";
import { categoryManagerActions } from "../../../../store/categoryManager/categoryManager.actions";
import { ApiResponse } from "../../../../models/base/api-base";
import { CreateJobTitleResponse } from "../../../../models/job-title/create/createJobTitle.response";

type AddCategoryModalProps = {
  open?: boolean;
  selectedJobTitle: JobTitleModel | null;
  handleClose?: () => void;
  handleSubmit?: (form: AddJobTitleFormType) => void;
};

export const AddJobTitleModal = ({
  open,
  selectedJobTitle,
  handleClose,
  handleSubmit,
}: AddCategoryModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const formMethods = useForm<AddJobTitleFormType>({
    defaultValues: {
      [ADD_JOB_TITLE_CONFIG.INPUTS.JOB_TITLE_NAME.KEY]:
        ADD_JOB_TITLE_CONFIG.INPUTS.JOB_TITLE_NAME.DEFAULT_VALUE,
    },
    resolver: zodResolver(ADD_JOB_TITLE_SCHEMA),
  });

  useEffect(() => {
    setIsOpen(!!open);
  }, [open]);

  useEffect(() => {
    if (!selectedJobTitle) return formMethods.setValue("jobTitleName", "");

    formMethods.setValue("jobTitleName", selectedJobTitle.title);
  }, [selectedJobTitle]);

  const handleCloseModal = useCallback(() => {
    handleClose && handleClose();
    setIsOpen(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onSubmit = useCallback(
    async (form: AddJobTitleFormType) => {
      if (selectedJobTitle && handleSubmit) return handleSubmit(form);

      const response = (await (
        await dispatch(categoryManagerActions.createJobTitleThunk(form))
      ).payload) as ApiResponse<CreateJobTitleResponse>;

      if (!response.isSucceeded || !response.data?.content) return;

      formMethods.reset();
      handleCloseModal();
    },
    [selectedJobTitle, handleSubmit, handleCloseModal]
  );

  const addOrEdit = selectedJobTitle ? "Edit" : "Add";
  return (
    <Box>
      <Box className="flex_align_center gap_1 mb-2">
        <Breadcrumb text="Job Title" />
        <ButtonPrimary onClickFunction={handleOpenModal}>
          Create Job Title
        </ButtonPrimary>
      </Box>

      <RenderByBoolean shouldRender={isOpen}>
        <ModalBase
          open={isOpen}
          title={`${addOrEdit} Job Titles`}
          onClose={handleCloseModal}
        >
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <Input
                name={ADD_JOB_TITLE_CONFIG.INPUTS.JOB_TITLE_NAME.KEY}
                label={ADD_JOB_TITLE_CONFIG.INPUTS.JOB_TITLE_NAME.LABEL}
                required={
                  ADD_JOB_TITLE_CONFIG.INPUTS.JOB_TITLE_NAME.IS_REQUIRED
                }
              />
              <ButtonPrimary type="submit">{addOrEdit}</ButtonPrimary>
            </form>
          </FormProvider>
        </ModalBase>
      </RenderByBoolean>
    </Box>
  );
};
