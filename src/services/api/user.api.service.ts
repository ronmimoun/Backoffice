import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../models/base/api-base";
import { getBaseURl } from "../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { GetUserResponse } from "../../models/user/get-users/getUsers.response";
import { UpdateUserResponse } from "../../models/user/update-user/updateUser.response";
import { GetByIdResponse } from "../../models/user/get-by-id/getById.response";
import { UpdateUserRequest } from "../../models/user/update-user/updateUser.request";
import { GetByIdRequest } from "../../models/user/get-by-id/getById.request";
import { RemoveUserRequest } from "../../models/user/remove/removeUser.request";
import { RemoveUserResponse } from "../../models/user/remove/removeUser.response";
import { CreateUserResponse } from "../../models/user/create-user/createUser.response";
import { CreateUserRequest } from "../../models/user/create-user/createUser.request";

const userHttpInstace = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const getUsers = async (): Promise<ApiResponse<GetUserResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/users",
  };

  const response = await userHttpInstace.managedRequest<GetUserResponse>(
    options
  );
  return response;
};

const updateUser = async (
  request: UpdateUserRequest
): Promise<ApiResponse<UpdateUserResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/users/update",
    data: request,
  };

  const response = await userHttpInstace.managedRequest<UpdateUserResponse>(
    options
  );
  return response;
};

const getById = async (
  request: GetByIdRequest
): Promise<ApiResponse<GetByIdResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: `/users/find/${request.userId}`,
    data: request,
  };

  const response = await userHttpInstace.managedRequest<GetByIdResponse>(
    options
  );
  return response;
};

const remove = async (
  request: RemoveUserRequest
): Promise<ApiResponse<RemoveUserResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: `/users/remove/${request.userId}`,
    data: request,
  };

  const response = await userHttpInstace.managedRequest<RemoveUserResponse>(
    options
  );
  return response;
};

const create = async (
  request: CreateUserRequest
): Promise<ApiResponse<CreateUserResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "users/create",
    data: request,
  };

  const response = await userHttpInstace.managedRequest<CreateUserResponse>(
    options
  );
  return response;
};

export const userApiService = {
  getUsers,
  getById,
  updateUser,
  remove,
  create,
};
