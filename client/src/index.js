import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./style.css";

import { AppContextProvider } from "./context/AppContext";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <QueryClientProvider client={client}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </AppContextProvider>
  </React.StrictMode>
);
