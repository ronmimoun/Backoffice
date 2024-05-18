import { AxiosError } from "axios";
import { ApiErrorSourceEnum, ServerError } from "../models/base/api-base";
import {
  RequestErrorOptions,
  TargetAPIHostEnum,
} from "../types/request/RequestOptions.type";
import {
  AlertMessage,
  AlertMessageBuilderArg,
} from "../types/alert/AlertMessage.type";
import { isServerErrorType } from "./api-response-builders.utils";

export function buildApiFailureResponseAlertMessage(
  error: AxiosError,
  errorSource: ApiErrorSourceEnum,
  _targetAPIHost?: TargetAPIHostEnum
): AlertMessage {
  const requestErrorOptions = error.config?.errorOptions;
  if (
    requestErrorOptions &&
    isCustomErrorAlert(requestErrorOptions, error, errorSource)
  ) {
    return buildAlertMessageByRequestErrorOptions(requestErrorOptions);
  }

  return buildAlertMessage({}, error);
}

function isCustomErrorAlert(
  requestErrorOptions: RequestErrorOptions,
  error: AxiosError,
  errorSource: ApiErrorSourceEnum
) {
  if (requestErrorOptions.ErrorAlertMode === "Custom") return true;

  const errorData = error.response?.data;
  if (
    requestErrorOptions.ErrorAlertMode === "CustomOrAutomaticApiErrors" &&
    errorSource != ApiErrorSourceEnum.RequestAPIError
  )
    return true;
  else if (
    requestErrorOptions.ErrorAlertMode === "CustomOrAutomaticApiErrors" &&
    (!errorData || !isServerErrorType(errorData))
  )
    return true;

  return false;
}

// function buildRequestAPIAlertMessage(
//   error: AxiosError,
//   isLockout?: boolean,
//   title?: TranslationText
// ): AlertMessage {
//   const alertMessageBuilderFunc = getAlertMessageBuilderFunc(isLockout);
//   const targetTitle: TranslationText = title || {
//     text: ApiErrorSourceEnum.RequestAPIError,
//   };

//   const errorData = error.response?.data;
//   if (!errorData || !isServerErrorType(errorData)) {
//     return alertMessageBuilderFunc({ title: targetTitle });
//   }

//   return alertMessageBuilderFunc({
//     title: targetTitle,
//     content: { text: errorData.message },
//     code: 5,
//   });
// }

function buildAlertMessageByRequestErrorOptions(
  requestErrorOptions: RequestErrorOptions
): AlertMessage {
  const alertMessageBuilderArg: AlertMessageBuilderArg = {
    title: requestErrorOptions.title,
    content: requestErrorOptions.content,
  };

  const alertMessageBuilderFunc = getAlertMessageBuilderFunc(
    requestErrorOptions.isLockout
  );
  return alertMessageBuilderFunc(alertMessageBuilderArg);
}

function buildLockoutAlertMessage({
  title,
  content,
  code,
}: AlertMessageBuilderArg): AlertMessage {
  return buildAlertMessage({
    title,
    content,
    code,
  });
}

function buildAlertMessage(
  { title, content, code }: AlertMessageBuilderArg,
  error?: AxiosError
): AlertMessage {
  if (error?.response) {
    return {
      title: (error.response?.data as ServerError).status,
      content: (error.response?.data as ServerError).message,
      code: error?.response?.status,
    };
  }

  return {
    title: title || "Unknown Error",
    content: content || "Some Problem Occurred",
    code: code || 0,
  };
}

function getAlertMessageBuilderFunc(isLockout?: boolean) {
  if (isLockout) return buildLockoutAlertMessage;
  else return buildAlertMessage;
}
