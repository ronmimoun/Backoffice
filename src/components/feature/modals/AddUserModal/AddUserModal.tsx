import classes from "./AddUserModal.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import { ModalBase } from "../../../ui/modals/ModalBase/ModalBase";
import { Input } from "../../../ui/Input/Input";
import {
  ADD_USER_FORM_CONFIG,
  ADD_USER_SCHEMA,
  AddUserForm,
} from "../../../../form/schemas/addUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonPrimary } from "../../../ui/Button/ButtonPrimary";
import { useCallback, useState } from "react";
import { useAppDispatch } from "../../../../store";
import { modalActions } from "../../../../store/modal/modal.actions";
import { UserGenderEnum } from "../../../../enums/UserGender.enum";
import { IsActiveUserEnum } from "../../../../enums/ActiveUser.enum";
import { UserTypesEnum } from "../../../../enums/UserTypes.enum";
import { userActions } from "../../../../store/user/user.actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "../../../../models/base/api-base";
import { CreateUserResponse } from "../../../../models/user/create-user/createUser.response";
import BasicSelectController from "../../../controllers/BasicSelectController/BasicSelectController";

const GENDER_TYPES = [
  { name: UserGenderEnum.Male, value: "male" },
  { name: UserGenderEnum.Female, value: "female" },
  { name: UserGenderEnum.Other, value: "other" },
];

const IS_ACTIVE_USER = [
  { name: IsActiveUserEnum.YES },
  { name: IsActiveUserEnum.NO },
];

const USER_TYPES = [
  { name: UserTypesEnum.Agent },
  { name: UserTypesEnum.No_Permission },
];

const AddUserModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const formMethods = useForm<AddUserForm>({
    defaultValues: {
      [ADD_USER_FORM_CONFIG.INPUTS.USERNAME.KEY]:
        ADD_USER_FORM_CONFIG.INPUTS.USERNAME.DEFAULT_VALUE,
      [ADD_USER_FORM_CONFIG.INPUTS.PHONE.KEY]:
        ADD_USER_FORM_CONFIG.INPUTS.PHONE.DEFAULT_VALUE,
      [ADD_USER_FORM_CONFIG.INPUTS.PERMISSIONS.KEY]:
        ADD_USER_FORM_CONFIG.INPUTS.PERMISSIONS.DEFAULT_VALUE,
      [ADD_USER_FORM_CONFIG.INPUTS.PASSWORD.KEY]:
        ADD_USER_FORM_CONFIG.INPUTS.PASSWORD.DEFAULT_VALUE,
      [ADD_USER_FORM_CONFIG.INPUTS.IS_ACTIVE.KEY]:
        ADD_USER_FORM_CONFIG.INPUTS.IS_ACTIVE.DEFAULT_VALUE,
      [ADD_USER_FORM_CONFIG.INPUTS.GENDER.KEY]:
        ADD_USER_FORM_CONFIG.INPUTS.GENDER.DEFAULT_VALUE,
      [ADD_USER_FORM_CONFIG.INPUTS.FULLNAME.KEY]:
        ADD_USER_FORM_CONFIG.INPUTS.FULLNAME.DEFAULT_VALUE,
      [ADD_USER_FORM_CONFIG.INPUTS.EMAIL.KEY]:
        ADD_USER_FORM_CONFIG.INPUTS.EMAIL.DEFAULT_VALUE,
      [ADD_USER_FORM_CONFIG.INPUTS.ADDRESS.KEY]:
        ADD_USER_FORM_CONFIG.INPUTS.ADDRESS.DEFAULT_VALUE,
    },
    resolver: zodResolver(ADD_USER_SCHEMA),
  });

  const handleSubmit = useCallback(async (data: AddUserForm) => {
    if (!window.confirm("Are you sure?")) return;
    const request = {
      ...data,
      isActive: data.isActive === IsActiveUserEnum.YES ? true : false,
      permissions:
        data.permissions === UserTypesEnum.Agent ? [UserTypesEnum.Agent] : [],
    };

    setIsLoading(true);
    const response = (await dispatch(
      userActions.createUserThunk(request)
    )) as PayloadAction<ApiResponse<CreateUserResponse>>;

    setIsLoading(false);
    if (!response.payload.isSucceeded || !response.payload.data?.content)
      return;

    closeModal();
  }, []);

  const closeModal = useCallback(() => {
    dispatch(modalActions.closeAddUserModal());
  }, []);

  return (
    <ModalBase
      open={true}
      title={ADD_USER_FORM_CONFIG.FORM_NAME}
      onClose={closeModal}
    >
      <FormProvider {...formMethods}>
        <form
          className={classes.form}
          onSubmit={formMethods.handleSubmit(handleSubmit)}
        >
          <div className={classes.form__inputs_container}>
            <div>
              <Input
                label={ADD_USER_FORM_CONFIG.INPUTS.USERNAME.LABEL}
                name={ADD_USER_FORM_CONFIG.INPUTS.USERNAME.KEY}
                required={ADD_USER_FORM_CONFIG.INPUTS.USERNAME.IS_REQUIRED}
              />
              <Input
                label={ADD_USER_FORM_CONFIG.INPUTS.FULLNAME.LABEL}
                name={ADD_USER_FORM_CONFIG.INPUTS.FULLNAME.KEY}
                required={ADD_USER_FORM_CONFIG.INPUTS.FULLNAME.IS_REQUIRED}
              />
              <Input
                label={ADD_USER_FORM_CONFIG.INPUTS.EMAIL.LABEL}
                name={ADD_USER_FORM_CONFIG.INPUTS.EMAIL.KEY}
                required={ADD_USER_FORM_CONFIG.INPUTS.EMAIL.IS_REQUIRED}
              />
              <Input
                label={ADD_USER_FORM_CONFIG.INPUTS.PASSWORD.LABEL}
                name={ADD_USER_FORM_CONFIG.INPUTS.PASSWORD.KEY}
                required={ADD_USER_FORM_CONFIG.INPUTS.PASSWORD.IS_REQUIRED}
              />
              <Input
                label={ADD_USER_FORM_CONFIG.INPUTS.PHONE.LABEL}
                name={ADD_USER_FORM_CONFIG.INPUTS.PHONE.KEY}
                required={ADD_USER_FORM_CONFIG.INPUTS.PHONE.IS_REQUIRED}
              />
            </div>

            <div>
              <Input
                label={ADD_USER_FORM_CONFIG.INPUTS.ADDRESS.LABEL}
                name={ADD_USER_FORM_CONFIG.INPUTS.ADDRESS.KEY}
                required={ADD_USER_FORM_CONFIG.INPUTS.ADDRESS.IS_REQUIRED}
              />
              <BasicSelectController
                required={ADD_USER_FORM_CONFIG.INPUTS.PERMISSIONS.IS_REQUIRED}
                list={USER_TYPES}
                name={ADD_USER_FORM_CONFIG.INPUTS.PERMISSIONS.KEY}
                textAccessor={
                  ADD_USER_FORM_CONFIG.INPUTS.PERMISSIONS.ACCESSORS.NAME
                }
                label={ADD_USER_FORM_CONFIG.INPUTS.PERMISSIONS.LABEL}
              />
              <BasicSelectController
                required={ADD_USER_FORM_CONFIG.INPUTS.GENDER.IS_REQUIRED}
                list={GENDER_TYPES}
                name={ADD_USER_FORM_CONFIG.INPUTS.GENDER.KEY}
                textAccessor={ADD_USER_FORM_CONFIG.INPUTS.GENDER.ACCESSORS.NAME}
                valueAccessor={
                  ADD_USER_FORM_CONFIG.INPUTS.GENDER.ACCESSORS.VALUE
                }
                label={ADD_USER_FORM_CONFIG.INPUTS.GENDER.LABEL}
              />

              <BasicSelectController
                required={ADD_USER_FORM_CONFIG.INPUTS.IS_ACTIVE.IS_REQUIRED}
                list={IS_ACTIVE_USER}
                name={ADD_USER_FORM_CONFIG.INPUTS.IS_ACTIVE.KEY}
                textAccessor={
                  ADD_USER_FORM_CONFIG.INPUTS.IS_ACTIVE.ACCESSORS.NAME
                }
                label={ADD_USER_FORM_CONFIG.INPUTS.IS_ACTIVE.LABEL}
              />
            </div>
          </div>
          <ButtonPrimary
            isLoading={isLoading}
            className={classes.form__submit_btn}
            type="submit"
          >
            Create
          </ButtonPrimary>
        </form>
      </FormProvider>
    </ModalBase>
  );
};

export default AddUserModal;
