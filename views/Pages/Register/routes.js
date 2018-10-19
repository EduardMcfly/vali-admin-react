import { CircleAnimation } from "../../../components";
import { VerifyEmail, Token } from "./views";

function Loading() {
    return CircleAnimation;
}

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
    {
        path: "/register",
        exact: true,
        name: "register",
        component: VerifyEmail
    },
    {
        path: "/register/token",
        exact: true,
        name: "token",
        component: Token
    },
    {
        path: "/register/token/:id",
        name: "tokenValue",
        component: Token
    }
];

export default routes;
