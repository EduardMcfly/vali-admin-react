import { CircleAnimation } from "../../../components";
import { TokenVerify } from "./views";

function Loading() {
    return CircleAnimation;
}

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
    {
        path: "/register/token",
        exact: true,
        name: "token",
        component: TokenVerify
    },
    {
        path: "/register/token/:token/:email",
        name: "tokenValue",
        component: TokenVerify
    },
    {
        path: "/register/token/:token",
        name: "tokenValue",
        component: TokenVerify
    }
];

export default routes;
