import { AxiosError } from "axios";
import { TranslationText } from "../types/translation/translation.type";
import { ApiErrorSourceEnum } from "../models/base/api-base";
import {
  RequestErrorOptions,
  TargetAPIHostEnum,
} from "../types/request/RequestOptions.type";
import {
  AlertCodeTypeEnum,
  AlertMessage,
  AlertMessageBuilderArg,
} from "../types/alert/AlertMessage.type";
import { isServerErrorType } from "./api-response-builders.utils";
// import { TranslationText } from "../types/translation/Translation";
// import { ApiErrorSourceEnum } from "../models/base/api-base";
// import {
//   RequestErrorOptions,
//   TargetAPIHostEnum,
// } from "../types/request/RequestOptions";
// import {
//   AlertCodeTypeEnum,
//   AlertMessage,
//   AlertMessageBuilderArg,
// } from "../types/alert/AlertMessage";
// import { isServerErrorType } from "./api-response-builders.utils";

const GENERAL_ERROR_TITLE_TEXT: TranslationText = {
  text: "An Problem Occurred",
  isTranslationKey: true,
};

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
    return buildAlertMessageByRequestErrorOptions(
      requestErrorOptions,
      errorSource
    );
  }

  const alertCodeType = AlertCodeTypeEnum.Server;
  const isLockout: boolean | undefined = requestErrorOptions?.isLockout;
  const alertMessageBuilderFunc = getAlertMessageBuilderFunc(isLockout);

  switch (errorSource) {
    case ApiErrorSourceEnum.RequestAPIError:
      return buildRequestAPIAlertMessage(
        error,
        alertCodeType,
        isLockout,
        requestErrorOptions?.title || GENERAL_ERROR_TITLE_TEXT
      );
    case ApiErrorSourceEnum.RequestNetworkError:
      return alertMessageBuilderFunc({
        title: GENERAL_ERROR_TITLE_TEXT,
        content: {
          text: "אירעה בעיה בעת ניסון התחברות לשרת",
          isTranslationKey: true,
        },
        alertCodeType: AlertCodeTypeEnum.Network,
      });
    default:
      return alertMessageBuilderFunc({
        title: GENERAL_ERROR_TITLE_TEXT,
        alertCodeType,
      });
  }
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

function buildRequestAPIAlertMessage(
  error: AxiosError,
  alertCodeType: AlertCodeTypeEnum,
  isLockout?: boolean,
  title?: TranslationText
): AlertMessage {
  const alertMessageBuilderFunc = getAlertMessageBuilderFunc(isLockout);
  const targetTitle: TranslationText = title || {
    text: ApiErrorSourceEnum.RequestAPIError,
  };

  const errorData = error.response?.data;
  if (!errorData || !isServerErrorType(errorData)) {
    return alertMessageBuilderFunc({ title: targetTitle, alertCodeType });
  }

  return alertMessageBuilderFunc({
    title: targetTitle,
    content: { text: errorData.errorDescription },
    code: errorData.errorCode,
    alertCodeType,
    alertSource: ApiErrorSourceEnum.RequestAPIError,
  });
}

function buildAlertMessageByRequestErrorOptions(
  requestErrorOptions: RequestErrorOptions,
  errorSource: ApiErrorSourceEnum
): AlertMessage {
  const alertMessageBuilderArg: AlertMessageBuilderArg = {
    title: requestErrorOptions.title,
    content: requestErrorOptions.content,
    alertSource: errorSource,
    buttons: requestErrorOptions.alertButton,
  };

  const alertMessageBuilderFunc = getAlertMessageBuilderFunc(
    requestErrorOptions.isLockout
  );
  return alertMessageBuilderFunc(alertMessageBuilderArg);
}

function buildLockoutAlertMessage(
  {
    title,
    content,
    code,
    alertCodeType,
    alertSource,
    buttons,
  }: AlertMessageBuilderArg,
  priority = 1
): AlertMessage {
  return buildAlertMessage(
    {
      title,
      content,
      code,
      alertCodeType,
      alertSource,
      buttons,
      isLockout: true,
    },
    priority
  );
}

function buildAlertMessage(
  {
    title,
    content,
    code,
    alertCodeType,
    alertSource,
    buttons,
    isLockout,
  }: AlertMessageBuilderArg,
  priority = 2
): AlertMessage {
  return {
    title: title,
    content: content || {
      text: "Some Problem Occurred",
      isTranslationKey: true,
    },
    priority,
    code,
    alertCodeType,
    alertSource: alertSource,
    buttons,
    isLockout,
  };
}

function getAlertMessageBuilderFunc(isLockout?: boolean) {
  if (isLockout) return buildLockoutAlertMessage;
  else return buildAlertMessage;
}
