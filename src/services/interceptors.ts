import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiErrorSourceEnum } from "../models/base/api-base";
import {
  RequestErrorOptions,
  RequestLoaderOptions,
} from "../types/request/RequestOptions.type";
import { buildApiFailureResponseAlertMessage } from "../utils/alert-message-builder.utils";
import { store } from "../utils/non-circular-injection.utils";
import {
  decrementLoaderCount,
  incrementLoaderCount,
} from "../store/global/global.reducer";
import { toast } from "react-toastify";

export function addInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(onRequestFulfilled, onRequestRejected);

  const onResponseRejectedRetry = async (error: AxiosError) => {
    return await onResponseRejected(error, instance);
  };
  instance.interceptors.response.use(
    onResponseFulfilled,
    onResponseRejectedRetry
  );
}

function onRequestFulfilled(config: InternalAxiosRequestConfig<any>) {
  handleLoader(config.loaderOptions);

  if (config.headers.Authorization) return config;

  return config;
}

function onRequestRejected(error: any) {
  return Promise.reject(error);
}

function onResponseFulfilled(response: AxiosResponse<any, any>) {
  handleLoader(response.config.loaderOptions, false);
  return response;
}

function onResponseRejected(error: AxiosError, instance: AxiosInstance) {
  const config = error.config;

  if (!!axios.isCancel(error) === true) {
    console.log("Request canceled", error);
    handleLoader(config?.loaderOptions, false);
    return Promise.reject(error);
  }

  if (shouldRetryRequest(config)) return retryRequest(error, instance);

  let errorSource: ApiErrorSourceEnum = ApiErrorSourceEnum.RequestUnknownError;
  if ((error as AxiosError<unknown, any>).response) {
    console.log(
      "API error",
      (error as AxiosError<unknown, any>).response?.data
    );
    errorSource = ApiErrorSourceEnum.RequestAPIError;
  } else if ((error as AxiosError<unknown, any>).request) {
    console.log("Network error", (error as AxiosError<unknown, any>).request);
    errorSource = ApiErrorSourceEnum.RequestNetworkError;
  } else {
    console.log(
      "Unknown request error",
      (error as AxiosError<unknown, any>).message
    );
  }

  handleError(error, errorSource);
  handleLoader(config?.loaderOptions, false);
  return Promise.reject(error);
}

const shouldRetryRequest = (
  config: InternalAxiosRequestConfig<any> | undefined
): boolean => {
  if (!config || !config.retryOptions?.retry) return false;

  config.retryOptions.__retryCount = config.retryOptions.__retryCount || 0;

  if (config.retryOptions.__retryCount >= config.retryOptions.retry)
    return false;

  return true;
};

const retryRequest = (
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
        `Retry #${config.retryOptions?.__retryCount} the request`,
        config.url
      );
      resolve();
    }, config.retryOptions?.retryDelay || 100);
  });

  return delayRetryRequest.then(() => {
    handleLoader(config.loaderOptions, false);
    instance(config);
  });
};

const handleLoader = (
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

const handleError = (error: AxiosError, errorSource: ApiErrorSourceEnum) => {
  const config = error.config;
  if (!isValidErrorAlert(config?.errorOptions)) return;

  const failureAlertMessage = buildApiFailureResponseAlertMessage(
    error,
    errorSource,
    config?.targetAPIHost
  );
  console.log("failureAlertMessage", failureAlertMessage);
  toast.error(
    `${failureAlertMessage.code} - ${failureAlertMessage.title}: ${failureAlertMessage.content}`
  );
};

const isValidErrorAlert = (errorOptions?: RequestErrorOptions) => {
  if (!errorOptions) return true;
  if (errorOptions.ErrorAlertMode === "Disabled") return false;

  return true;
};
