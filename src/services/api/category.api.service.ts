import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../models/base/api-base";
import { getBaseURl } from "../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { CreateCategoryResponse } from "../../models/category/create/createCategory.response";
import { CreateCategoryRequest } from "../../models/category/create/createCategory.request";
import { RemoveCategoryRequest } from "../../models/category/remove/removeCategory.request";
import { RemoveCategoryResponse } from "../../models/category/remove/removeCategory.response";
import { UpdateCategoryRequest } from "../../models/category/update/updateCategory.request";
import { UpdateCategoryResponse } from "../../models/category/update/updateCategory.response";

const getCategoryHttpInstance = () =>
  createManagedAxiosInstance(buildGeneralApiInstanceConfig(getBaseURl()));

const create = async (
  request: CreateCategoryRequest
): Promise<ApiResponse<CreateCategoryResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/categories/create",
    data: request,
  };

  const response =
    await getCategoryHttpInstance().managedRequest<CreateCategoryResponse>(
      options
    );
  return response;
};

const remove = async (
  request: RemoveCategoryRequest
): Promise<ApiResponse<RemoveCategoryResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: `/categories/${request}`,
    data: request,
  };

  const response =
    await getCategoryHttpInstance().managedRequest<RemoveCategoryResponse>(
      options
    );
  return response;
};

const update = async (
  request: UpdateCategoryRequest
): Promise<ApiResponse<UpdateCategoryResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: `/categories/update/${request}`,
    data: request,
  };

  const response =
    await getCategoryHttpInstance().managedRequest<UpdateCategoryResponse>(
      options
    );
  return response;
};

export const categoryApiService = {
  create,
  remove,
  update,
};
