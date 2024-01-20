import "./assets/styles/main.scss";
import MainRouterProvider from "./routes/MainRouterProvider";
import store from "./store";
import { injectStore } from "./utils/non-circular-injection.utils";
injectStore(store);

function App() {
  return <MainRouterProvider />;
}
export default App;
