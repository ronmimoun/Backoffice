import { AxiosRequestConfig } from "axios";
import { getBaseURl } from "../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { ApiResponse } from "../../models/base/api-base";
import { GetUserWaitlistResponse } from "../../models/user-waitlist/get/getUserWaitlist.response";
import { UpdateUserWaitlistResponse } from "../../models/user-waitlist/update/updateUserWaitlist.response";
import { UpdateUserWaitlistRequest } from "../../models/user-waitlist/update/updateUserWaitlist.request";

const waitlistHttpInstace = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const get = async (): Promise<ApiResponse<GetUserWaitlistResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/user_waitlist",
  };

  const response =
    await waitlistHttpInstace.managedRequest<GetUserWaitlistResponse>(options);
  return response;
};

const update = async (
  request: UpdateUserWaitlistRequest
): Promise<ApiResponse<UpdateUserWaitlistResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: `/user_waitlist/update/${request.pendingUser._id}`,
    data: request,
  };

  const response =
    await waitlistHttpInstace.managedRequest<UpdateUserWaitlistResponse>(
      options
    );
  return response;
};

const create = async (): Promise<ApiResponse<UpdateUserWaitlistResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/user_waitlist/create",
  };

  const response =
    await waitlistHttpInstace.managedRequest<UpdateUserWaitlistResponse>(
      options
    );
  return response;
};

export const userWaitlistApiService = {
  get,
  update,
  create,
};
