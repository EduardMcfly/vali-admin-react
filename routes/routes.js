import React from "react";
import Loadable from "react-loadable";
import DefaultLayout from "../containers/DefaultLayout";
import { CircleAnimation } from "../components";
import i18next from "./../i18n";
const delay = 5000;

function Loading(props) {
    if (props.error) {
        swal({
            imageUrl: "https://unsplash.it/400/200",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            animation: false,
            title: i18next.t("error"),
            confirmButtonColor: "#3085d6",
            confirmButtonText: i18next.t("refresh")
        }).then(result => {
            if (result.value) {
                props.retry();
            }
        });
    } else if (props.timedOut) {
        return (
            <div>
                Taking a long time...{" "}
                <button onClick={props.retry}>Retry</button>
            </div>
        );
    }
    return <CircleAnimation width={"30%"} />;
}

const Farms = Loadable({
    loader: () => import("../views/Farms"),
    loading: Loading,
    timeout: delay
});

const Farm = Loadable({
    loader: () => import("../views/Farm"),
    loading: Loading,
    timeout: delay
});

const Colors = Loadable({
    loader: () => import("../views/Theme/Colors"),
    loading: Loading,
    timeout: delay
});

const Typography = Loadable({
    loader: () => import("../views/Theme/Typography"),
    loading: Loading,
    timeout: delay
});

const Buttons = Loadable({
    loader: () => import("../views/Buttons/Buttons"),
    loading: Loading,
    timeout: delay
});

const ButtonDropdowns = Loadable({
    loader: () => import("../views/Buttons/ButtonDropdowns"),
    loading: Loading,
    timeout: delay
});

const ButtonGroups = Loadable({
    loader: () => import("../views/Buttons/ButtonGroups"),
    loading: Loading,
    timeout: delay
});

const BrandButtons = Loadable({
    loader: () => import("../views/Buttons/BrandButtons"),
    loading: Loading,
    timeout: delay
});

const CoreUIIcons = Loadable({
    loader: () => import("../views/Icons/CoreUIIcons"),
    loading: Loading,
    timeout: delay
});

const Flags = Loadable({
    loader: () => import("../views/Icons/Flags"),
    loading: Loading,
    timeout: delay
});

const FontAwesome = Loadable({
    loader: () => import("../views/Icons/FontAwesome"),
    loading: Loading,
    timeout: delay
});

const SimpleLineIcons = Loadable({
    loader: () => import("../views/Icons/SimpleLineIcons"),
    loading: Loading,
    timeout: delay
});

const Alerts = Loadable({
    loader: () => import("../views/Notifications/Alerts"),
    loading: Loading,
    timeout: delay
});

const Badges = Loadable({
    loader: () => import("../views/Notifications/Badges"),
    loading: Loading,
    timeout: delay
});

const Modals = Loadable({
    loader: () => import("../views/Notifications/Modals"),
    loading: Loading,
    timeout: delay
});

const Widgets = Loadable({
    loader: () => import("../views/Widgets/Widgets"),
    loading: Loading,
    timeout: delay
});

const Charts = Loadable({
    loader: () => import("../views/Charts"),
    loading: Loading,
    timeout: delay
});

const Users = Loadable({
    loader: () => import("../views/Users/Users"),
    loading: Loading,
    timeout: delay
});

const User = Loadable({
    loader: () => import("../views/Users/User"),
    loading: Loading,
    timeout: delay
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = {
    withoutAnimation: [
        { path: "/farm", exact: true, name: "farms", component: Farms }
    ],
    animated: [
        { path: "/", exact: true, name: "home", component: DefaultLayout },
        { path: "/theme", exact: true, name: "theme", component: Colors },
        { path: "/theme/colors", name: "colors", component: Colors },
        {
            path: "/theme/typography",
            name: "typography",
            component: Typography
        },
        { path: "/farm/:id", name: "farm", component: Farm },
        { path: "/farm/:id/buttons", name: "colors", component: Colors },
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
        {
            path: "/users/:id",
            exact: true,
            name: "userDetails",
            component: User
        }
    ]
};

export default routes;
