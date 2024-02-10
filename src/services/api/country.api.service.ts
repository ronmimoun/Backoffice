import { ApiResponse } from "../../models/base/api-base";
import { getBaseURl } from "../../utils/api.utils";
import { GetCountryResponse } from "../../models/country/get/getCountry.response";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { AxiosRequestConfig } from "axios";
import { RemoveCountryResponse } from "../../models/country/remove/removeCountry.response";
import { RemoveCountryRequest } from "../../models/country/remove/removeCountry.request";
import { CreateCountryRequest } from "../../models/country/create/createCountry.request";
import { CreateCountryResponse } from "../../models/country/create/createCountry.response";
import { UpdateCountryRequest } from "../../models/country/update/updateCountry.request";
import { UpdateCountryResponse } from "../../models/country/update/updateCountry.response";

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

const remove = async (
  countryId: RemoveCountryRequest
): Promise<ApiResponse<RemoveCountryResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: `/country/${countryId}`,
  };

  const response =
    await createCountryAxiosInstance().managedRequest<RemoveCountryResponse>(
      options
    );
  return response;
};

const create = async (
  request: CreateCountryRequest
): Promise<ApiResponse<CreateCountryResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/country/create",
    data: request,
  };

  const response =
    await createCountryAxiosInstance().managedRequest<CreateCountryResponse>(
      options
    );
  return response;
};

const update = async (
  request: UpdateCountryRequest
): Promise<ApiResponse<UpdateCountryResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: `/country/update/${request._id}`,
    data: request,
  };

  const response =
    await createCountryAxiosInstance().managedRequest<UpdateCountryResponse>(
      options
    );
  return response;
};

export const countryApiService = {
  query,
  remove,
  create,
  update,
};
