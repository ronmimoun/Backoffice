import { ApiResponse } from "../../models/base/api-base";
import { getCategoryManagerResponse } from "../../models/category-manager/get/getCategoryManager.response";
import { getBaseURl } from "../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { AxiosRequestConfig } from "axios";

function getCategoryManagerHttpInstance() {
  return createManagedAxiosInstance(
    buildGeneralApiInstanceConfig(getBaseURl())
  );
}

const getCategoryManager = async (): Promise<
  ApiResponse<getCategoryManagerResponse>
> => {
  const options: AxiosRequestConfig = {
    method: "get",
    url: "/categories/all-categories",
  };

  const response =
    await getCategoryManagerHttpInstance().managedRequest<getCategoryManagerResponse>(
      options
    );
  return response;
};

export const categoriesApiService = {
  getCategoryManager,
};
