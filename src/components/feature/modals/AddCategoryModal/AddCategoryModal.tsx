import { Box } from "@mui/material";
import { ModalBase } from "../../../ui/modals/ModalBase/ModalBase";
import { useCallback, useEffect, useState } from "react";
import { ButtonPrimary } from "../../../ui/Button/ButtonPrimary";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../../ui/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../../../store";
import { ApiResponse } from "../../../../models/base/api-base";
import { Breadcrumb } from "../../../shared/Breadcrumb/Breadcrumb";
import {
  ADD_CATEGORY_CONFIG,
  ADD_CATEGORY_SCHEMA,
  AddCategoryFormType,
} from "../../../../form/schemas/addCategorySchema";
import { CategoryModel } from "../../../../store/categoryManager/categoryManager-state";
import { RenderByBoolean } from "../../../shared/RenderByBoolean/RenderByBoolean";
import { categoryManagerThunkActions } from "../../../../store/categoryManager/categoryManager.thunk-builder";
import { CreateCategoryResponse } from "../../../../models/category/create/createCategory.response";

type AddCategoryModalProps = {
  open?: boolean;
  selectedCategory: CategoryModel | null;
  handleClose?: () => void;
  handleSubmit?: (form: AddCategoryFormType) => void;
};

export const AddCategoryModal = ({
  open,
  selectedCategory,
  handleClose,
  handleSubmit,
}: AddCategoryModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const formMethods = useForm<AddCategoryFormType>({
    defaultValues: {
      [ADD_CATEGORY_CONFIG.INPUTS.CATEGORY_NAME.KEY]:
        ADD_CATEGORY_CONFIG.INPUTS.CATEGORY_NAME.DEFAULT_VALUE,
    },
    resolver: zodResolver(ADD_CATEGORY_SCHEMA),
  });

  useEffect(() => {
    setIsOpen(!!open);
  }, [open]);

  useEffect(() => {
    if (!selectedCategory) return formMethods.setValue("category", "");

    formMethods.setValue("category", selectedCategory.title);
  }, [selectedCategory]);

  const handleCloseModal = useCallback(() => {
    handleClose && handleClose();
    setIsOpen(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onSubmit = useCallback(
    async (form: AddCategoryFormType) => {
      if (selectedCategory && handleSubmit) return handleSubmit(form);

      const response = (await (
        await dispatch(categoryManagerThunkActions.createCategoryThunk(form))
      ).payload) as ApiResponse<CreateCategoryResponse>;

      if (!response.isSucceeded || !response.data?.content) return;

      formMethods.reset();
      handleCloseModal();
    },
    [selectedCategory, handleSubmit, handleCloseModal]
  );

  const addOrEdit = selectedCategory ? "Edit" : "Add";
  return (
    <Box>
      <Box className="flex_align_center gap_1 mb-2">
        <Breadcrumb text="Category" />
        <ButtonPrimary onClickFunction={handleOpenModal}>
          Create Category
        </ButtonPrimary>
      </Box>

      <RenderByBoolean shouldRender={isOpen}>
        <ModalBase
          open={isOpen}
          title={`${addOrEdit} Categories`}
          onClose={handleCloseModal}
        >
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <Input
                name={ADD_CATEGORY_CONFIG.INPUTS.CATEGORY_NAME.KEY}
                label={ADD_CATEGORY_CONFIG.INPUTS.CATEGORY_NAME.LABEL}
                required={ADD_CATEGORY_CONFIG.INPUTS.CATEGORY_NAME.IS_REQUIRED}
              />
              <ButtonPrimary type="submit">{addOrEdit}</ButtonPrimary>
            </form>
          </FormProvider>
        </ModalBase>
      </RenderByBoolean>
    </Box>
  );
};
