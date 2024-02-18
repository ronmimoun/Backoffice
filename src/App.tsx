import { useEffect } from "react";
import "./assets/styles/main.scss";
import MainRouterProvider from "./routes/MainRouterProvider";
import store, { useAppDispatch } from "./store";
import { injectStore } from "./utils/non-circular-injection.utils";
import { globalActions } from "./store/global/global.actions";

injectStore(store);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initial = async () => {
      dispatch(globalActions.globalInitThunk());
    };

    initial();
  }, []);

  return <MainRouterProvider />;
}
export default App;
