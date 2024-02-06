import classes from "./FileInput.module.scss";
import { Box } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { CircularImage } from "../../shared/CircularImage/CircularImage";
import { NO_IMAGE_FALLBACK } from "../../../constants/image.constants";
import { Publish } from "@mui/icons-material";

export const FileInput = () => {
  const [selectedImg, setSelectedImg] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImagePicking = useCallback(() => {
    inputRef.current && inputRef.current.click();
  }, [inputRef]);

  const handleInputChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (!ev.target.files) return;
      const selectedFile = ev.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const imgUrl = reader.result;
        setSelectedImg(imgUrl as string);
      };
      reader.readAsDataURL(selectedFile);
    },
    []
  );

  return (
    <Box>
      <Box className={classes.container} onClick={handleImagePicking}>
        <CircularImage
          src={selectedImg || NO_IMAGE_FALLBACK}
          alt="file-picker"
        />
        <Publish />
      </Box>
      <input
        onChange={handleInputChange}
        type="file"
        accept="image/*"
        ref={inputRef}
        hidden
      />
    </Box>
  );
};
