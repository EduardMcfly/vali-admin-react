import { Route, Redirect } from "react-router-dom";
import React from "react";
const fakeAuth = {
    isAuthenticated: true,
    authenticate(cb) {
        console.log(cb);
        this.isAuthenticated = true;
        setTimeout(cb, 100);
    },
    signout(cb) {
        console.log(cb);
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            fakeAuth.isAuthenticated === true ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);
export {fakeAuth,PrivateRoute};
