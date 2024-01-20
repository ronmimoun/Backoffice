import { AddUserForm } from "../../../form/schemas/addUserSchema";

export type CreateUserRequest = {
  permissions: string[];
  isActive: boolean;
} & Omit<AddUserForm, "isActive" | "permissions">;
