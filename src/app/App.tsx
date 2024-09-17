import React, { useContext } from "react";

import appContext from "./context";
import { Router } from "router/Router";
import { BrowserRouter } from "react-router-dom";

export const useAppContext = () => useContext(appContext);

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
};
