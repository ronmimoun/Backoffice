import { AxiosRequestConfig } from "axios";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { ApiResponse } from "../../models/base/api-base";
import { getBaseURl } from "../../utils/api.utils";
import { getAgentContactRequestResponse } from "../../models/contact-request/get/getContactRequest.response";
import { getAgentContactRequest } from "../../models/contact-request/get/getContactRequest.request";
import { updateAgentContactRequest } from "../../models/contact-request/update/updateAgentContactRequest.request";
import { updateAgentContactRequestResponse } from "../../models/contact-request/update/updateAgentContactRequest.response";

const agentContactRequestHttpInstace = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const query = async (
  request: getAgentContactRequest = {}
): Promise<ApiResponse<getAgentContactRequestResponse>> => {
  const options: AxiosRequestConfig = {
    method: "get",
    url: "/contact/request/",
    data: request,
  };

  const response =
    await agentContactRequestHttpInstace.managedRequest<getAgentContactRequestResponse>(
      options
    );
  return response;
};

const remove = async (request: string): Promise<ApiResponse<null>> => {
  const options: AxiosRequestConfig = {
    method: "delete",
    url: `/contact/request/remove/${request}`,
  };

  const response = await agentContactRequestHttpInstace.managedRequest<null>(
    options
  );
  return response;
};

const update = async (
  request: updateAgentContactRequest
): Promise<ApiResponse<updateAgentContactRequestResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/contact/request/update",
    data: request,
  };

  const response =
    await agentContactRequestHttpInstace.managedRequest<updateAgentContactRequestResponse>(
      options
    );
  return response;
};

export const agentContactRequestApiService = {
  query,
  remove,
  update,
};
