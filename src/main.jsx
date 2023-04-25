import "./static/css/index.css";
/*import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);*/


import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(<App />);