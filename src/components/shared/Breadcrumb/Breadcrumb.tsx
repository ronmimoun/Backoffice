import { Typography, TypographyProps } from "@mui/material";

type BreadcrumbProps = {
  text: string;
} & TypographyProps;

export const Breadcrumb = ({
  text,
  variant = "h4",
  ...props
}: BreadcrumbProps) => {
  return (
    <Typography className="mb-1" {...props} variant={variant}>
      {text}
    </Typography>
  );
};
