import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../models/base/api-base";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { getBaseURl } from "../../utils/api.utils";
import {
  GetContactLLMInfoSearchRequest,
  GetContactLLMInfoSearchResponse,
} from "../../types/llm/getContactLLMInfoSearch.type";

const llmHttpInstance = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const getContactLLMInfoSearch = async (
  request: GetContactLLMInfoSearchRequest
): Promise<ApiResponse<GetContactLLMInfoSearchResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/llm/getContactLLMInfoSearch",
    data: request,
  };

  const response =
    await llmHttpInstance.managedRequest<GetContactLLMInfoSearchResponse>(
      options
    );
  return response;
};

export const llmApiService = {
  getContactLLMInfoSearch,
};
