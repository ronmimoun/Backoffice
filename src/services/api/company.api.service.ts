import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../models/base/api-base";
import { CreateCompanyRequest } from "../../models/company/create/createCompany.request";
import { CreateCompanyResponse } from "../../models/company/create/createCompany.response";
import { getBaseURl } from "../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";

const companyHttpInstance = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const create = async (
  request: CreateCompanyRequest
): Promise<ApiResponse<CreateCompanyResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/company/create",
    data: request,
  };

  const response =
    await companyHttpInstance.managedRequest<CreateCompanyResponse>(options);
  return response;
};

export const companyApiService = {
  create,
};
