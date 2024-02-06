import classes from "./CircularImage.module.scss";

type CircularImageProps = {
  size?: number;
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export const CircularImage = ({ size = 3, ...props }: CircularImageProps) => {
  const style = {
    height: `${size}rem`,
    width: `${size}rem`,
  };

  return <img {...props} style={style} className={classes.image} />;
};
