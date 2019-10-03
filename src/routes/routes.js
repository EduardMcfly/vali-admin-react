import React from "react";
import Loadable from "react-loadable";
import { Button } from "reactstrap";
import DefaultLayout from "../containers/DefaultLayout";
import { CircleAnimation } from "../components";
import i18next from "./../i18n";
import { swal } from "sweetalert2";
const delay = 5000;

class Loading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { props } = this;

        if (props.error) {
            return (
                <div>
                    <CircleAnimation className={"my-5"} width={"10%"} />
                    <h5 className="text-center my-5 text-danger">
                        {i18next.t("error")}
                    </h5>
                    <Button
                        outline
                        color="info mx-auto d-flex"
                        onClick={props.retry}
                    >
                        {i18next.t("refresh")}
                    </Button>
                </div>
            );
        } else if (props.timedOut) {
            swal({
                title: i18next.t("error"),
                confirmButtonColor: "#3085d6",
                confirmButtonText: i18next.t("refresh")
            }).then(result => {
                if (result.value) {
                    props.retry();
                }
            });
        }
        return <CircleAnimation width={"30%"} />;
    }
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
        { path: "/farm/:id", name: "farm", component: Farm },
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
