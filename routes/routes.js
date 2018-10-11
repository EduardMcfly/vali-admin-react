import React from "react";
import Loadable from "react-loadable";
import DefaultLayout from "../containers/DefaultLayout";
import { CircleCharge } from "../components";

function Loading() {
    return <CircleCharge/>;
}

const Farm = Loadable({
    loader: () => import("../views/Farm"),
    loading: Loading
});

const Andres = Loadable({
    loader: () => import("../views/Andres"),
    loading: Loading
});

const Farms = Loadable({
    loader: () => import("../views/Farms"),
    loading: Loading
});

const Colors = Loadable({
    loader: () => import("../views/Theme/Colors"),
    loading: Loading
});

const Typography = Loadable({
    loader: () => import("../views/Theme/Typography"),
    loading: Loading
});

const Buttons = Loadable({
    loader: () => import("../views/Buttons/Buttons"),
    loading: Loading
});

const ButtonDropdowns = Loadable({
    loader: () => import("../views/Buttons/ButtonDropdowns"),
    loading: Loading
});

const ButtonGroups = Loadable({
    loader: () => import("../views/Buttons/ButtonGroups"),
    loading: Loading
});

const BrandButtons = Loadable({
    loader: () => import("../views/Buttons/BrandButtons"),
    loading: Loading
});

const CoreUIIcons = Loadable({
    loader: () => import("../views/Icons/CoreUIIcons"),
    loading: Loading
});

const Flags = Loadable({
    loader: () => import("../views/Icons/Flags"),
    loading: Loading
});

const FontAwesome = Loadable({
    loader: () => import("../views/Icons/FontAwesome"),
    loading: Loading
});

const SimpleLineIcons = Loadable({
    loader: () => import("../views/Icons/SimpleLineIcons"),
    loading: Loading
});

const Alerts = Loadable({
    loader: () => import("../views/Notifications/Alerts"),
    loading: Loading
});

const Badges = Loadable({
    loader: () => import("../views/Notifications/Badges"),
    loading: Loading
});

const Modals = Loadable({
    loader: () => import("../views/Notifications/Modals"),
    loading: Loading
});

const Widgets = Loadable({
    loader: () => import("../views/Widgets/Widgets"),
    loading: Loading
});

const Charts = Loadable({
    loader: () => import("../views/Charts"),
    loading: Loading
});

const Users = Loadable({
    loader: () => import("../views/Users/Users"),
    loading: Loading
});

const User = Loadable({
    loader: () => import("../views/Users/User"),
    loading: Loading
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
    { path: "/", exact: true, name: "home", component: DefaultLayout },
    { path: "/andres", name: "Andres", component: Andres },
    { path: "/farm/:id", name: "farm", component: Farm },
    { path: "/farm/:id/buttons", name: "colors", component: Colors },
    { path: "/farms", name: "farms", component: Farms },
    { path: "/theme", exact: true, name: "theme", component: Colors },
    { path: "/theme/colors", name: "colors", component: Colors },
    { path: "/theme/typography", name: "typography", component: Typography },
    { path: "/buttons", exact: true, name: "buttons", component: Buttons },
    { path: "/buttons/buttons", name: "buttons", component: Buttons },
    {
        path: "/buttons/button-dropdowns",
        name: "button Dropdowns",
        component: ButtonDropdowns
    },
    {
        path: "/buttons/button-groups",
        name: "button Groups",
        component: ButtonGroups
    },
    {
        path: "/buttons/brand-buttons",
        name: "brand Buttons",
        component: BrandButtons
    },
    { path: "/icons", exact: true, name: "icons", component: CoreUIIcons },
    {
        path: "/icons/coreui-icons",
        name: "coreui Icons",
        component: CoreUIIcons
    },
    { path: "/icons/flags", name: "flags", component: Flags },
    {
        path: "/icons/font-awesome",
        name: "font Awesome",
        component: FontAwesome
    },
    {
        path: "/icons/simple-line-icons",
        name: "simple Line Icons",
        component: SimpleLineIcons
    },
    {
        path: "/notifications",
        exact: true,
        name: "notifications",
        component: Alerts
    },
    { path: "/notifications/alerts", name: "alerts", component: Alerts },
    { path: "/notifications/badges", name: "badges", component: Badges },
    { path: "/notifications/modals", name: "modals", component: Modals },
    { path: "/widgets", name: "widgets", component: Widgets },
    { path: "/charts", name: "charts", component: Charts },
    { path: "/users", exact: true, name: "users", component: Users },
    { path: "/users/:id", exact: true, name: "userDetails", component: User }
];

export default routes;
