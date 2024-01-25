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
    <Typography {...props} variant={variant}>
      {text}
    </Typography>
  );
};
