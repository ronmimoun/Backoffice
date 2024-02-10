import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../models/base/api-base";
import { CreateCompanyRequest } from "../../models/company/create/createCompany.request";
import { CreateCompanyResponse } from "../../models/company/create/createCompany.response";
import { getBaseURl } from "../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { RemoveCompanyRequest } from "../../models/company/remove/removeCompany.request";
import { RemoveCompanyResponse } from "../../models/company/remove/removeCompany.response";
import { UpdateCompanyRequest } from "../../models/company/update/updateCompany.request";
import { UpdateCompanyResponse } from "../../models/company/update/updateCompany.response";

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

const remove = async (
  request: RemoveCompanyRequest
): Promise<ApiResponse<RemoveCompanyResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: `/company/${request}`,
    data: request,
  };

  const response =
    await companyHttpInstance.managedRequest<RemoveCompanyResponse>(options);
  return response;
};

const update = async (
  request: UpdateCompanyRequest
): Promise<ApiResponse<UpdateCompanyResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: `/company/update/${request}`,
    data: request,
  };

  const response =
    await companyHttpInstance.managedRequest<UpdateCompanyResponse>(options);
  return response;
};

export const companyApiService = {
  create,
  remove,
  update,
};
