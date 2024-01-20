import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import store from "./store/index.ts";
import { Provider } from "react-redux";
import AppLoader from "./components/utils/AppLoader/AppLoader.tsx";
import { Suspense } from "react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <Suspense fallback="Loading...">
      <AppLoader />
      <App />
    </Suspense>
  </Provider>
);