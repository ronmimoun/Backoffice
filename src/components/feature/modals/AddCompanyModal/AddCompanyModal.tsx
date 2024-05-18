import { Box } from "@mui/material";
import { ModalBase } from "../../../ui/modals/ModalBase/ModalBase";
import { useCallback, useEffect, useState } from "react";
import { ButtonPrimary } from "../../../ui/Button/ButtonPrimary";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../../ui/Input/InputBase/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../../../store";
import { Breadcrumb } from "../../../shared/Breadcrumb/Breadcrumb";
import {
  CategoryModel,
  CompanyModel,
} from "../../../../store/categoryManager/categoryManager-state";
import { RenderByBoolean } from "../../../shared/RenderByBoolean/RenderByBoolean";
import {
  ADD_COMPANY_CONFIG,
  ADD_COMPANY_SCHEMA,
  AddCompanyFormType,
} from "../../../../form/schemas/addCompanySchema";
import BasicSelect from "../../../ui/BasicSelect/BasicSelect";
import { useSelector } from "react-redux";
import { categoryManagerSelectors } from "../../../../store/categoryManager/categoryManager.selectors";
import { categoryManagerActions } from "../../../../store/categoryManager/categoryManager.actions";
import { ApiResponse } from "../../../../models/base/api-base";
import { CreateCompanyResponse } from "../../../../models/company/create/createCompany.response";
import { stringUtilService } from "../../../../utils/string.utils";

type AddCompanyModalProps = {
  open?: boolean;
  selectedCompany: CompanyModel | null;
  handleClose?: () => void;
  handleSubmit?: (form: AddCompanyFormType) => void;
};

export const AddCompanyModal = ({
  open,
  selectedCompany: selectedCompany,
  handleClose,
  handleSubmit,
}: AddCompanyModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { categories } = useSelector(
    categoryManagerSelectors.categoryManager()
  );

  const dispatch = useAppDispatch();
  const formMethods = useForm<AddCompanyFormType>({
    defaultValues: {
      [ADD_COMPANY_CONFIG.INPUTS.COMPANY_NAME.KEY]:
        ADD_COMPANY_CONFIG.INPUTS.COMPANY_NAME.DEFAULT_VALUE,
      [ADD_COMPANY_CONFIG.INPUTS.CATEGORY.KEY]:
        ADD_COMPANY_CONFIG.INPUTS.CATEGORY.DEFAULT_VALUE,
    },
    resolver: zodResolver(ADD_COMPANY_SCHEMA),
  });

  useEffect(() => {
    setIsOpen(!!open);
  }, [open]);

  useEffect(() => {
    if (!selectedCompany) {
      formMethods.setValue("category", "");
      formMethods.setValue("company", "");
      return;
    }

    formMethods.setValue("category", selectedCompany.category);
    formMethods.setValue("company", selectedCompany.company);
  }, [selectedCompany]);

  const handleCloseModal = useCallback(() => {
    handleClose && handleClose();
    setIsOpen(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onSubmit = useCallback(
    async (form: AddCompanyFormType) => {
      if (selectedCompany && handleSubmit) return handleSubmit(form);

      const response = (await (
        await dispatch(categoryManagerActions.createCompanyThunk(form))
      ).payload) as ApiResponse<CreateCompanyResponse>;

      if (!response.isSucceeded || !response.data?.content) return;

      formMethods.reset();
      handleCloseModal();
    },
    [selectedCompany, handleSubmit, handleCloseModal]
  );

  const handleCategorySelect = useCallback((category: CategoryModel) => {
    formMethods.setValue("category", category.cat);
  }, []);

  const addOrEdit = selectedCompany ? "Edit" : "Add";
  return (
    <Box>
      <Box className="flex_align_center gap_1 mb-2">
        <Breadcrumb text="Company" />
        <ButtonPrimary onClickFunction={handleOpenModal}>
          Create Company
        </ButtonPrimary>
      </Box>

      <RenderByBoolean shouldRender={isOpen}>
        <ModalBase
          open={isOpen}
          title={`${addOrEdit} Companies`}
          onClose={handleCloseModal}
        >
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <Input
                name={ADD_COMPANY_CONFIG.INPUTS.COMPANY_NAME.KEY}
                label={ADD_COMPANY_CONFIG.INPUTS.COMPANY_NAME.LABEL}
                required={ADD_COMPANY_CONFIG.INPUTS.COMPANY_NAME.IS_REQUIRED}
              />
              <BasicSelect
                list={categories}
                textAccessor={
                  ADD_COMPANY_CONFIG.INPUTS.CATEGORY.ACCESSORS.VALUE
                }
                handleChange={handleCategorySelect}
                name={ADD_COMPANY_CONFIG.INPUTS.CATEGORY.KEY}
                label={ADD_COMPANY_CONFIG.INPUTS.CATEGORY.LABEL}
                required={ADD_COMPANY_CONFIG.INPUTS.CATEGORY.IS_REQUIRED}
                value={stringUtilService.getFirstLetterUppercase(
                  selectedCompany?.category
                )}
              />
              <ButtonPrimary type="submit">{addOrEdit}</ButtonPrimary>
            </form>
          </FormProvider>
        </ModalBase>
      </RenderByBoolean>
    </Box>
  );
};
