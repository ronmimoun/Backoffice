import classes from "./CircularImage.module.scss";

type CircularImageProps = {} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export const CircularImage = ({ ...props }: CircularImageProps) => {
  return <img {...props} className={classes.image} />;
};
