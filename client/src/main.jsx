import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // React 18: createRoot is used
import "./index.css"; // Importing global styles (Tailwind or custom)
import App from "./App.jsx"; // Import the main App component

// Creating a root element and rendering the app with StrictMode
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
