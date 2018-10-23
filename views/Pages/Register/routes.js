import { CircleAnimation } from "../../../components";
import { Register, TokenVerify } from "./views";

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
        path: "/register/token/:id",
        name: "tokenValue",
        component: Register
    }
];

export default routes;
