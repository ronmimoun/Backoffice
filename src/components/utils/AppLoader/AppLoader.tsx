import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../store/global/global.selectors";

const AppLoader = () => {
  const isAppLoading = useSelector(globalSelectors.isLoading);

  if (!isAppLoading) return <></>;
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default AppLoader;
