import { Publish } from "@mui/icons-material";
import { fileApiService } from "../../../services/api/file.api.service";
import { UploadResponse } from "../../../models/file/upload/upload.response";
import CircularProgressLoader from "../../ui/CircularProgressLoader/CircularProgressLoader";
import { useState } from "react";

type FileUploaderProps = {
  cb?: (res: UploadResponse) => void;
};

export const FileUploader = ({ cb }: FileUploaderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileUpload = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    if (!ev.target.files) return;
    const selectedFile = ev.target.files[0];
    const formData = new FormData();
    formData.append("upload", selectedFile);
    const res = await fileApiService.upload(formData);
    if (!res.isSucceeded || !res.data?.content) return;
    cb && cb(res.data.content);
    setIsLoading(false);
  };

  return (
    <div className="contactUpload">
      <label htmlFor="file">
        <CircularProgressLoader isLoading={isLoading}>
          <Publish />
        </CircularProgressLoader>
        <input
          type="file"
          id="file"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
};
