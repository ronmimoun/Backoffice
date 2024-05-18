import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../models/base/api-base";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { getBaseURl } from "../../utils/api.utils";
import { getSupportChatsRequest } from "../../models/support-chat/get/getSupportChats.request";
import { getSupportChatsResponse } from "../../models/support-chat/get/getSupportChats.response";
import { CreateSupportChatRequest } from "../../models/support-chat/create/createSupportChat.request";
import { CreateSupportChatResponse } from "../../models/support-chat/create/createSupportChat.response";
import { getByIdSupportChatsResponse } from "../../models/support-chat/getById/getByIdSupportChats.response";
import { getByIdSupportChatsRequest } from "../../models/support-chat/getById/getByIdSupportChats.request";

const supportChatHttpInstance = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const get = async (
  request: getSupportChatsRequest
): Promise<ApiResponse<getSupportChatsResponse>> => {
  const options: AxiosRequestConfig = {
    method: "get",
    url: "/support_chat",
    data: request,
  };

  const response =
    await supportChatHttpInstance.managedRequest<getSupportChatsResponse>(
      options
    );
  return response;
};

const create = async (
  requestPayload: CreateSupportChatRequest
): Promise<ApiResponse<CreateSupportChatResponse>> => {
  const options = {
    method: "post",
    url: "/support_chat/admin-msg",
    data: requestPayload,
  };

  const response =
    await supportChatHttpInstance.managedRequest<CreateSupportChatResponse>(
      options
    );
  return response;
};

const getById = async (
  request: getByIdSupportChatsRequest
): Promise<ApiResponse<getByIdSupportChatsResponse>> => {
  const options = {
    method: "get",
    url: `/support_chat/${request}`,
  };

  const response =
    await supportChatHttpInstance.managedRequest<getByIdSupportChatsResponse>(
      options
    );
  return response;
};

export const supportChatApiService = {
  get,
  create,
  getById,
};
