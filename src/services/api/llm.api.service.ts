import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../models/base/api-base";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { getBaseURl } from "../../utils/api.utils";
import {
  GetContactDetailsRequest,
  GetContactDetailsResponse,
} from "../../types/llm/get-contact-details";

const llmHttpInstance = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const getContactDetails = async (
  request: GetContactDetailsRequest
): Promise<ApiResponse<GetContactDetailsResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/llm/getContactDetails",
    data: request,
  };

  const response =
    await llmHttpInstance.managedRequest<GetContactDetailsResponse>(options);
  return response;
};

export const llmApiService = {
  getContactDetails,
};
