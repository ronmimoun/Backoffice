import { ApiResponse } from "../../models/base/api-base";
import { getBaseURl } from "../../utils/api.utils";
import { GetCountryResponse } from "../../models/country/get/getCountry.response";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { AxiosRequestConfig } from "axios";

const createCountryAxiosInstance = () => {
  return createManagedAxiosInstance(
    buildGeneralApiInstanceConfig(getBaseURl()),
    false
  );
};

const query = async (): Promise<ApiResponse<GetCountryResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/country",
  };

  const response =
    await createCountryAxiosInstance().managedRequest<GetCountryResponse>(
      options
    );
  return response;
};

export const countryApiService = {
  query,
};
