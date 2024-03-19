import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";

import App from "./App.js";
import ConstextProvider,{Context} from "./context.js";



const AppWrapper = () => {
return(
  <ConstextProvider>
    <App/>
  </ConstextProvider>
)

  
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);