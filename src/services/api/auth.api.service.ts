import { AxiosRequestConfig } from "axios";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { getBaseURl } from "../../utils/api.utils";
import { LoginRequest } from "../../models/auth/login/login.request";
import { ApiResponse } from "../../models/base/api-base";
import { LoginResponse } from "../../models/auth/login/login.response";

const authHttpInstace = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const login = async (
  request?: LoginRequest
): Promise<ApiResponse<LoginResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/auth/login",
    data: request,
  };

  const response = await authHttpInstace.managedRequest<LoginResponse>(options);
  return response;
};
const logout = async (): Promise<ApiResponse<void>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/auth/logout",
  };

  const response = await authHttpInstace.managedRequest<void>(options);
  return response;
};

export const authApiService = {
  login,
  logout,
};
