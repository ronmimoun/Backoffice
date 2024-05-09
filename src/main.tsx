import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import store from "./store/index.ts";
import { Provider } from "react-redux";
import AppLoader from "./components/feature/globals/AppLoader/AppLoader.tsx";
import { Suspense } from "react";
import { PopupContainer } from "./components/feature/PopupContainer/PopupContainer.tsx";
import "react-toastify/dist/ReactToastify.css";
import GlobalErrorBoundary from "./components/feature/GlobalErrorBoundary/GlobalErrorBoundary.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GlobalErrorBoundary>
    <Provider store={store}>
      <Suspense fallback="Loading...">
        <AppLoader />
        <PopupContainer />
        <App />
      </Suspense>
    </Provider>
  </GlobalErrorBoundary>
);
