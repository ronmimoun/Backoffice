import {
  AxiosError,
  AxiosInstance,
  AxiosStatic,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiErrorSourceEnum } from "../models/base/api-base";
import { buildApiFailureResponseAlertMessage } from "../utils/alert-message-builder.utils";
import { store } from "../utils/non-circular-injection.utils";
import {
  RequestErrorOptions,
  RequestLoaderOptions,
} from "../types/request/RequestOptions.type";
import { isServerErrorType } from "../utils/api-response-builders.utils";
import { toast } from "react-toastify";
import {
  decrementLoaderCount,
  incrementLoaderCount,
} from "../store/global/global.reducer";

export function onRequestRejected(error: any) {
  return Promise.reject(error);
}

export const retryRequest = (
  error: AxiosError,
  instance: AxiosInstance
): Promise<any> => {
  const config = error.config;

  if (!config || !config.retryOptions?.retry) {
    handleLoader(config?.loaderOptions, false);
    return Promise.reject(error);
  }

  if (!config.retryOptions.__retryCount) {
    config.retryOptions.__retryCount = 0;
  }

  config.retryOptions.__retryCount += 1;

  const delayRetryRequest = new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(
        `retry #${config.retryOptions?.__retryCount} the request`,
        config.url
      );
      resolve();
    }, config.retryOptions?.retryDelay || 100);
  });

  return delayRetryRequest.then(() => {
    handleLoader(config?.loaderOptions, false);
    return instance(config);
  });
};

export const shouldRetryRequest = (
  config: InternalAxiosRequestConfig<any> | undefined
): boolean => {
  if (!config || !config.retryOptions?.retry) {
    return false;
  }

  config.retryOptions.__retryCount = config.retryOptions.__retryCount || 0;

  if (config.retryOptions.__retryCount >= config.retryOptions.retry) {
    return false;
  }

  return true;
};

export const handleAxiosCancel = (
  axios: AxiosStatic,
  error: AxiosError,
  config?: InternalAxiosRequestConfig
) => {
  if (!!axios.isCancel(error) === true) {
    console.log("Request canceled", error.message);
    handleLoader(config?.loaderOptions, false);
    return Promise.reject(error);
  }
};

export const handleErrorResponse = (
  error: AxiosError,
  config?: InternalAxiosRequestConfig
) => {
  let errorSource: ApiErrorSourceEnum = ApiErrorSourceEnum.RequestUnknownError;
  if (error.response) {
    console.log("API error", error.response.data);
    errorSource = ApiErrorSourceEnum.RequestAPIError;
  } else if (error.request) {
    console.log("Network error", error.request);
    errorSource = ApiErrorSourceEnum.RequestNetworkError;
  } else {
    console.log("Unknown Request error", error);
  }

  handleLoader(config?.loaderOptions, false);
  handleError(error, errorSource);
};

const handleError = (error: AxiosError, errorSource: ApiErrorSourceEnum) => {
  const config = error.config;
  if (!isValidForErrorAlert(config?.errorOptions, error.response?.data)) return;

  const failureAlertMessage = buildApiFailureResponseAlertMessage(
    error,
    errorSource,
    config?.targetAPIHost
  );

  toast.error(
    `${failureAlertMessage.code} - ${failureAlertMessage.title}: ${failureAlertMessage.content}`
  );
};

export const isValidForErrorAlert = (
  errorOptions?: RequestErrorOptions,
  errorData?: any
) => {
  if (!errorOptions) return true;
  if (errorOptions.ErrorAlertMode === "Disabled") return false;
  if (isIgnoredErrorCode(errorOptions, errorData)) return false;
  return true;
};

const isIgnoredErrorCode = (
  errorOptions: RequestErrorOptions,
  errorData?: any
) => {
  if (!errorOptions.ignoredErrorCodes || !errorData) return false;
  if (!isServerErrorType(errorData)) return false;

  return errorOptions.ignoredErrorCodes.has(errorData.errorCode.toString());
};

export const handleLoader = (
  loaderOptions?: RequestLoaderOptions,
  isIncrement: boolean = true
) => {
  if (loaderOptions?.ignore) return;

  if (isIncrement) {
    store.dispatch(incrementLoaderCount());
  } else {
    store.dispatch(decrementLoaderCount());
  }
};
