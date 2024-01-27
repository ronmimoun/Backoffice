import { ToastContainer } from "react-toastify";

export const PopupContainer = () => {
  return (
    <ToastContainer
      // position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};
