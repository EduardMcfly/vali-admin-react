import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./i18n";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
require("./libreries");
require("./app-utilities/index");

import rootReducer from './reducers'

import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
    <Provider store={createStore(rootReducer)}>
        <App />
    </Provider>, document.getElementById("root"));

registerServiceWorker();
