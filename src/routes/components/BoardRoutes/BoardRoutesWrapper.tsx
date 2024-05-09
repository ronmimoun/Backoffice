import { useEffect } from "react";
import Navbar from "../../../components/feature/layout/navbar/Navbar";
import { DefaultAppLayout } from "../../../layout/DefaultAppLayout";
import { ModalsContainer } from "../../../layout/ModalsContainer";
import { useAppDispatch } from "../../../store";
import { globalActions } from "../../../store/global/global.actions";

export const BoardRoutesWrapper = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initial = async () => {
      dispatch(globalActions.globalInitThunk());
    };

    initial();
  }, []);

  return (
    <>
      <Navbar />
      <DefaultAppLayout />
      <ModalsContainer />
    </>
  );
};
