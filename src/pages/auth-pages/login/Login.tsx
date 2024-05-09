import classes from "./login.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../../components/ui/Input/Input";
import { ButtonPrimary } from "../../../components/ui/Button/ButtonPrimary";
import {
  LOGIN_FORM_CONFIG,
  LOGIN_SCHEMA,
  LoginForm,
} from "../../../form/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useAppDispatch } from "../../../store";
import { userActions } from "../../../store/user/user.actions";
import { useNavigate } from "react-router-dom";
import { ApiResponse } from "../../../models/base/api-base";
import { LoginResponse } from "../../../models/auth/login/login.response";
import { PayloadAction } from "@reduxjs/toolkit";
import { BOARD_PAGE_ROUTES } from "../../../routes/board-routes";

const Login = () => {
  const formMethods = useForm<LoginForm>({
    defaultValues: {
      [LOGIN_FORM_CONFIG.INPUTS.USERNAME.KEY]:
        LOGIN_FORM_CONFIG.INPUTS.USERNAME.DEFAULT_VALUE,
      [LOGIN_FORM_CONFIG.INPUTS.PASSWORD.KEY]:
        LOGIN_FORM_CONFIG.INPUTS.PASSWORD.DEFAULT_VALUE,
    },
    resolver: zodResolver(LOGIN_SCHEMA),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = useCallback(async (data: LoginForm) => {
    const response = (await dispatch(
      userActions.loginThunk(data)
    )) as PayloadAction<ApiResponse<LoginResponse>>;

    if (
      !response.payload.isSucceeded ||
      !response.payload.data ||
      !response.payload.data.content.user.isAdmin
    )
      return;

    navigate(BOARD_PAGE_ROUTES.FULL_ROUTE_NAME);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <h3>Login</h3>
            <p>Enter your username and your password.</p>
            <Input name={LOGIN_FORM_CONFIG.INPUTS.USERNAME.KEY} />
            <Input
              name={LOGIN_FORM_CONFIG.INPUTS.PASSWORD.KEY}
              type="password"
            />
            <ButtonPrimary type="submit">Login</ButtonPrimary>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Login;
