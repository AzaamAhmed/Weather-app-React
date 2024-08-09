import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// To register the service worker and enable offline capabilities, use:
serviceWorker.register();

// To unregister and disable offline capabilities, use:
// serviceWorker.unregister();
