import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../models/base/api-base";
import { getBaseURl } from "../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { GetContactsResponse } from "../../models/contact/get/getContacts.response";
import { GetcontactByIdRequest } from "../../models/contact/getById/getContactById.request";
import { GetcontactByIdResponse } from "../../models/contact/getById/getContactById.response";
import { UpdateContactRequest } from "../../models/contact/update/updateContact.request";
import { UpdateContactResponse } from "../../models/contact/update/updateContact.response";
import { CreateContactRequest } from "../../models/contact/create/createContact.request";
import { CreateContactResponse } from "../../models/contact/create/createContact.response";
import { CreateManyContactsResponse } from "../../models/contact/createMany/createManyContacts.response";
import { CreateManyContactsRequest } from "../../models/contact/createMany/createManyContacts.request";
import { RemoveContactByIdRequest } from "../../models/contact/remove/removeContactById.request";
import { RemoveContactByIdResponse } from "../../models/contact/remove/removeContactById.response";

const contactHttpInstance = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const getContacts = async (): Promise<ApiResponse<GetContactsResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/contacts",
  };

  const response =
    await contactHttpInstance.managedRequest<GetContactsResponse>(options);
  return response;
};

const removeContactById = async (
  request: RemoveContactByIdRequest
): Promise<ApiResponse<RemoveContactByIdResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: `/contacts/${request}`,
    data: request,
  };

  const response =
    await contactHttpInstance.managedRequest<RemoveContactByIdResponse>(
      options
    );
  return response;
};

const getContactById = async (
  request: GetcontactByIdRequest
): Promise<ApiResponse<GetcontactByIdResponse>> => {
  const options: AxiosRequestConfig = {
    method: "get",
    url: `/contacts/find/${request}`,
  };

  const response =
    await contactHttpInstance.managedRequest<GetcontactByIdResponse>(options);
  return response;
};

const update = async (
  requestPayload: UpdateContactRequest
): Promise<ApiResponse<UpdateContactResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: `/contacts/update/${requestPayload._id}`,
    data: requestPayload,
  };

  const response =
    await contactHttpInstance.managedRequest<UpdateContactResponse>(options);
  return response;
};

const create = async (
  requestPayload: CreateContactRequest
): Promise<ApiResponse<CreateContactResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/contacts/create",
    data: requestPayload,
  };

  const response =
    await contactHttpInstance.managedRequest<CreateContactResponse>(options);
  return response;
};

const createMany = async (
  requestPayload: CreateManyContactsRequest
): Promise<ApiResponse<CreateManyContactsResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/contacts/create/company",
    data: requestPayload,
  };

  const response =
    await contactHttpInstance.managedRequest<CreateManyContactsResponse>(
      options
    );
  return response;
};

export const contactApiService = {
  getContacts,
  removeContactById,
  getContactById,
  update,
  create,
  createMany,
};
