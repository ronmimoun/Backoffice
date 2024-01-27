import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../models/base/api-base";
import { getBaseURl } from "../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { CreateCategoryResponse } from "../../models/category/create/createCategory.response";
import { CreateCategoryRequest } from "../../models/category/create/createCategory.request";

const categoryHttpInstance = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const create = async (
  request: CreateCategoryRequest
): Promise<ApiResponse<CreateCategoryResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/categories/create",
    data: request,
  };

  const response =
    await categoryHttpInstance.managedRequest<CreateCategoryResponse>(options);
  return response;
};

export const categoryApiService = {
  create,
};
