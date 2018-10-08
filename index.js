import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./i18n";
require("./libreries");
require("./app-utilities/index");

import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

registerServiceWorker();
