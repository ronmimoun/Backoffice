import { AxiosError } from "axios";
// import { decrementLoaderCount, incrementLoaderCount } from "../store/global/global.reducer";
import {
  RequestErrorOptions,
  RequestLoaderOptions,
} from "../types/request/RequestOptions.type";
import { store } from "../utils/non-circular-injection.utils";
import { ApiErrorSourceEnum } from "../models/base/api-base";
import { toast } from "react-toastify";
import { buildApiFailureResponseAlertMessage } from "../utils/alert-message-builder.utils";
import { globalActions } from "../store/global/global.actions";

export const handleLoader = (
  loaderOptions?: RequestLoaderOptions,
  isIncrement: boolean = true
) => {
  if (loaderOptions?.ignore) return;

  if (isIncrement) {
    store.dispatch(globalActions.incrementLoaderCount());
  } else {
    store.dispatch(globalActions.decrementLoaderCount());
  }
};

export const handleError = (
  error: AxiosError,
  errorSource: ApiErrorSourceEnum
) => {
  const config = error.config;
  if (!_isValidErrorAlert(config?.errorOptions)) return;

  const failureAlertMessage = buildApiFailureResponseAlertMessage(
    error,
    errorSource,
    config?.targetAPIHost
  );
  toast.error(
    `${failureAlertMessage.code} - ${failureAlertMessage.title}: ${failureAlertMessage.content}`
  );
};

const _isValidErrorAlert = (errorOptions?: RequestErrorOptions) => {
  if (!errorOptions) return true;
  if (errorOptions.ErrorAlertMode === "Disabled") return false;

  return true;
};
