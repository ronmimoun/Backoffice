import { EditUserForm } from "../../../form/schemas/userSchema";
import { ImageModel } from "../../../types/image.type";

export type UpdateUserRequest = {
  _id: string;
  imgUrl?: ImageModel;
} & Partial<EditUserForm>;
