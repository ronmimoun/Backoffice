import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { concatBearerToken } from "../utils/header.util";
import { store } from "../utils/non-circular-injection.utils";
import {
  handleAxiosCancel,
  handleErrorResponse,
  handleLoader,
  onRequestRejected,
  retryRequest,
  shouldRetryRequest,
} from "./interceptors-functions-core";

export function addInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(
    onServerRequestFulfilled,
    onRequestRejected
  );

  const onResponseRejectedRetry = async (error: AxiosError) => {
    return await onServerResponseRejected(error, instance);
  };
  instance.interceptors.response.use(
    onServerResponseFulfilled,
    onResponseRejectedRetry
  );
}

function onServerRequestFulfilled(config: InternalAxiosRequestConfig<any>) {
  handleLoader(config.loaderOptions);
  addJwtHeader(config);
  return config;
}

export const addJwtHeader = (config: InternalAxiosRequestConfig<any>) => {
  if (config.headers.Authorization) return;

  const jwt = store.getState().user.jwtToken;
  if (!jwt) return;

  config.headers.Authorization = concatBearerToken(jwt);
};

export function onServerResponseFulfilled(response: AxiosResponse<any, any>) {
  handleLoader(response.config?.loaderOptions, false);
  return response;
}

function onServerResponseRejected(error: AxiosError, instance: AxiosInstance) {
  const config = error.config;

  const axiosCancellation = handleAxiosCancel(axios, error, config);
  if (axiosCancellation) return axiosCancellation;

  if (shouldRetryRequest(config)) return retryRequest(error, instance);

  handleErrorResponse(error);

  return Promise.reject(error);
}
