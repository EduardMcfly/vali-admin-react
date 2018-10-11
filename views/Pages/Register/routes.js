import { CircleAnimation } from "../../../components";
import { Register, Token } from "./views";

function Loading() {
    return CircleAnimation;
}

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
    { path: "/register", exact: true, name: "register", component: Register },
    {
        path: "/register/token",
        name: "token",
        component: Token
    }
];

export default routes;
