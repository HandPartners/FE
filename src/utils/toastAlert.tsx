import type { AlertColor } from "@mui/material";
import * as ReactDOM from "react-dom/client";
import Toast from "../components/toast/Toast";

export const toastAlert = (message: string, type: AlertColor) => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = ReactDOM.createRoot(container);

  root.render(<Toast message={message} type={type} />);

  // 딜레이 여유
  setTimeout(() => {
    root.unmount();
    container.remove();
  }, 3500);
};
