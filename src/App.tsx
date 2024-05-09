import "./assets/styles/main.scss";
import store from "./store";
import { injectStore } from "./utils/non-circular-injection.utils";
import { MainRouterProvider } from "./routes/MainRouterProvider";

injectStore(store);

function App() {
  return <MainRouterProvider />;
}
export default App;
