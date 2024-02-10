import { Box } from "@mui/material";
import { ModalBase } from "../ModalBase/ModalBase";
import { useCallback, useEffect, useState } from "react";
import { ButtonPrimary } from "../../ui/Button/ButtonPrimary";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../ui/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ADD_COUNTRY_CONFIG,
  ADD_COUNTRY_SCHEMA,
  AddCountryFormType,
} from "../../../form/schemas/addCountrySchema";
import { useAppDispatch } from "../../../store";
import { categoryManagerActions } from "../../../store/categoryManager/categoryManager.actions";
import { ApiResponse } from "../../../models/base/api-base";
import { CreateCountryResponse } from "../../../models/country/create/createCountry.response";
import { Breadcrumb } from "../../shared/Breadcrumb/Breadcrumb";
import { CountryModel } from "../../../types/country.type";
import { RenderByBoolean } from "../../utils/RenderByBoolean/RenderByBoolean";

type AddCountryModalProps = {
  open?: boolean;
  selectedCountry: CountryModel | null;
  handleClose?: () => void;
  handleSubmit?: (form: AddCountryFormType) => void;
};

export const AddCountryModal = ({
  open,
  selectedCountry,
  handleClose,
  handleSubmit,
}: AddCountryModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const formMethods = useForm<AddCountryFormType>({
    defaultValues: {
      [ADD_COUNTRY_CONFIG.INPUTS.COUNTRY_NAME.KEY]:
        ADD_COUNTRY_CONFIG.INPUTS.COUNTRY_NAME.DEFAULT_VALUE,
      [ADD_COUNTRY_CONFIG.INPUTS.COUNTRY_CODE.KEY]:
        ADD_COUNTRY_CONFIG.INPUTS.COUNTRY_CODE.DEFAULT_VALUE,
    },
    resolver: zodResolver(ADD_COUNTRY_SCHEMA),
  });

  useEffect(() => {
    setIsOpen(!!open);
  }, [open]);

  useEffect(() => {
    if (!selectedCountry) {
      formMethods.setValue("name", "");
      formMethods.setValue("code", "");
      return;
    }

    formMethods.setValue("name", selectedCountry.name);
    formMethods.setValue("code", selectedCountry.code);
  }, [selectedCountry]);

  const handleCloseModal = useCallback(() => {
    handleClose && handleClose();
    setIsOpen(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onSubmit = useCallback(
    async (form: AddCountryFormType) => {
      if (selectedCountry && handleSubmit) return handleSubmit(form);
      console.log("selectedCountry", selectedCountry);

      const response = (
        await dispatch(categoryManagerActions.createCountryThunk(form))
      ).payload as ApiResponse<CreateCountryResponse>;
      if (!response.isSucceeded || !response.data?.content) return;

      handleCloseModal();
    },
    [selectedCountry, handleSubmit, handleCloseModal]
  );

  const addOrEdit = selectedCountry ? "Edit" : "Add";
  return (
    <Box>
      <Box className="flex_align_center gap_1 mb-2">
        <Breadcrumb text="Country" />
        <ButtonPrimary onClickFunction={handleOpenModal}>
          Create Country
        </ButtonPrimary>
      </Box>

      <RenderByBoolean shouldRender={isOpen}>
        <ModalBase
          open={isOpen}
          title={`${addOrEdit} Country`}
          onClose={handleCloseModal}
        >
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <Input
                name={ADD_COUNTRY_CONFIG.INPUTS.COUNTRY_NAME.KEY}
                label={ADD_COUNTRY_CONFIG.INPUTS.COUNTRY_NAME.LABEL}
                required={ADD_COUNTRY_CONFIG.INPUTS.COUNTRY_NAME.IS_REQUIRED}
              />
              <Input
                name={ADD_COUNTRY_CONFIG.INPUTS.COUNTRY_CODE.KEY}
                label={ADD_COUNTRY_CONFIG.INPUTS.COUNTRY_CODE.LABEL}
                required={ADD_COUNTRY_CONFIG.INPUTS.COUNTRY_CODE.IS_REQUIRED}
              />
              <ButtonPrimary type="submit">{addOrEdit}</ButtonPrimary>
            </form>
          </FormProvider>
        </ModalBase>
      </RenderByBoolean>
    </Box>
  );
};
