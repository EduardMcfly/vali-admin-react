import React from "react";
import Loadable from "react-loadable";
import { I18n, Trans } from "react-i18next";
import { CircleCharge } from "../../../components";

function Loading() {
    return CircleCharge;
}

const Register = Loadable({
    loader: () => import("./views/Register.js"),
    loading: Loading
});

const Token = Loadable({
    loader: () => import("./views/Token.js"),
    loading: Loading
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
    { path: "/register", exact: true, name: "Andres", component: Register },
    { path: "/register/token", name: "token", component: Token }
];

export default routes;
