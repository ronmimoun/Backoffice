import { Controller, useFormContext } from "react-hook-form";
import { FileInput } from "../../form/FileInput/FileInput";

type FileInputControllerProps = {
  name: string;
  defaultValue?: string;
};

export const FileInputController = ({
  name,
  ...props
}: FileInputControllerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return <FileInput {...props} key={name} onChange={field.onChange} />;
      }}
    />
  );
};
