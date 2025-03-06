import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from "axios";
import {
  ApiErrorSourceEnum,
  ApiResponse,
  ApiServerResponse,
} from "../models/base/api-base";
import {
  failureApiResponse,
  successfulApiResponse,
} from "../utils/api-response-builders.utils";
import { addInterceptors } from "./interceptors";
import { TargetAPIHostEnum } from "../types/request/RequestOptions.type";

async function managedRequest<T extends ApiServerResponse<T>>(
  this: AxiosInstance,
  options: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await this.request<T>({
      ...options,
      withCredentials: true,
    });
    return successfulApiResponse<T>(response.data);
  } catch (error: any) {
    if (axios.isCancel(error)) {
      return failureApiResponse<T>(ApiErrorSourceEnum.RequestCanceled);
    } else if (error.response) {
      return failureApiResponse<T>(
        ApiErrorSourceEnum.RequestAPIError,
        error.response.data
      );
    } else if (error.request) {
      return failureApiResponse<T>(ApiErrorSourceEnum.RequestNetworkError);
    } else {
      return failureApiResponse<T>(ApiErrorSourceEnum.RequestUnknownError);
    }
  }
}

type ManagedAxiosInstance = {
  managedRequest<T>(
    this: AxiosInstance,
    options: AxiosRequestConfig
  ): Promise<ApiResponse<T>>;
} & AxiosInstance;

export const createManagedAxiosInstance = (
  config?: CreateAxiosDefaults<any>,
  useInterceptors: boolean = true
): ManagedAxiosInstance => {
  const axiosInstance: AxiosInstance = axios.create(config);

  if (useInterceptors) addInterceptors(axiosInstance);

  const managedAxiosInstance = axiosInstance as ManagedAxiosInstance;
  managedAxiosInstance.managedRequest = managedRequest as ManagedAxiosInstance;
  return managedAxiosInstance;
};

export const buildGeneralApiInstanceConfig = (baseURL: string) => {
  // Use a default timeout of 30 seconds if VITE_API_KEY is not defined or not a valid number
  const timeoutInSeconds = import.meta.env.VITE_API_TIMEOUT_SECONDS;
  const timeout = timeoutInSeconds ? Number(timeoutInSeconds) * 1000 : 30000;

  // Ensure baseURL is valid
  if (!baseURL) {
    console.error(
      "Invalid baseURL provided to buildGeneralApiInstanceConfig:",
      baseURL
    );
    // Fallback to a default URL if needed
    baseURL = import.meta.env.VITE_APP_LOCAL || "http://localhost:8080/api/";
  }

  const config: CreateAxiosDefaults<any> = {
    baseURL,
    timeout,
    targetAPIHost: TargetAPIHostEnum.Server,
  };

  return config;
};
