import { EditUserForm } from "../../../form/schemas/userSchema";
import { ImageModel } from "../../../types/image.type";

export type UpdateUserRequest = {
  _id: string;
  imgUrl?: ImageModel;
  isAdmin: boolean;
} & Omit<Partial<EditUserForm>, "isAdmin">;
