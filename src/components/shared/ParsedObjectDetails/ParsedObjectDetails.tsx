import classes from "./parsedObjectDetails.module.scss";
import { useCallback, useEffect, useState } from "react";
import { UploadResponse } from "../../../models/file/upload/upload.response";
import { FileUploader } from "../FileUploader/FileUploader";
import { NO_IMAGE_FALLBACK } from "../../../constants/image.constants";
import { useAppDispatch } from "../../../store";
import { userActions } from "../../../store/user/user.actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "../../../models/base/api-base";
import { UpdateUserResponse } from "../../../models/user/update-user/updateUser.response";

type ParsedObjectDetailsProps<T extends object> = {
  details: T;
  imgUrl: string | null;
  title: string;
  entityId: string;
  className?: string;
};

const ParsedObjectDetails = <T extends object>({
  details,
  imgUrl,
  title,
  entityId,
  className = "",
}: ParsedObjectDetailsProps<T>) => {
  const [image, setImage] = useState<string>(imgUrl || NO_IMAGE_FALLBACK);
  const [objectDetails, setObjectDetails] = useState<T>(details);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setObjectDetails(details);
  }, [details]);

  useEffect(() => {
    setImage(imgUrl || NO_IMAGE_FALLBACK);
  }, [imgUrl]);

  const handleImageUpload = useCallback(async (image: UploadResponse) => {
    const response = (await dispatch(
      userActions.updateUserThunk({
        _id: entityId,
        imgUrl: image,
        isAdmin: false,
      })
    )) as PayloadAction<ApiResponse<UpdateUserResponse>>;

    if (!response.payload.isSucceeded || !response.payload.data?.content)
      return;
    setImage(image.url);
  }, []);

  return (
    <div className={`${classes.info} ${className}`}>
      <div className={classes.topInfo}>
        {details && <img src={image} alt="" />}
        <h1>{title}</h1>
        <FileUploader cb={handleImageUpload} />
      </div>
      <div className={classes.details}>
        {Object.entries(objectDetails).map((item) => (
          <div className={classes.item} key={item[0]}>
            <span className={classes.itemTitle}>{item[0]}:</span>
            <span className={classes.itemValue}>
              {item[1] as React.ReactNode}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParsedObjectDetails;
