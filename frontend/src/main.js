import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

const App = () => {
  return <h1>Hi</h1>;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
