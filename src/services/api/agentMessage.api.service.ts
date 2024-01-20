import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../models/base/api-base";
import { getBaseURl } from "../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { GetAgentMessagesResponse } from "../../models/agent-message/get/getAgentMessages.response";

const agentMessageHttpInstace = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const get = async (): Promise<ApiResponse<GetAgentMessagesResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "agentMessage/getUsers",
  };

  const response =
    await agentMessageHttpInstace.managedRequest<GetAgentMessagesResponse>(
      options
    );
  return response;
};

export const agentMessageApiService = {
  get,
};
