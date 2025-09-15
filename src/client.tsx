import App from "./App/Router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

console.log("Running Slashstep Client Web version 0.1.0");

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);