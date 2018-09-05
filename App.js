import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
// Styles
// CoreUI Icons Set
import "@coreui/icons/css/coreui-icons.min.css";
// Import Flag Icons Set
import "flag-icon-css/css/flag-icon.min.css";
// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";
// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";
// Import Main styles for this application
/* import './scss/style.css'; */
import "../sass/app.css";

// Containers
import { DefaultLayout } from "./containers";
import { AuthUser, AuthFarm } from "./controllers";
// Pages
import { Login, Page404, Page500, Register, Home } from "./views/Pages";
import { log } from "util";
import { setTimeout } from "timers";

// import { renderRoutes } from 'react-router-config';

class App extends Component {
    constructor(props) {
        super(props);
        this.csrfTime = false;
        this.state = {
            authenticated: true,
            login: false,
            CSRF: false,
            loginFarm: true
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.loginFarm = this.loginFarm.bind(this);
        this.logoutFarm = this.logoutFarm.bind(this);
        this.varifyAuthFarm = this.varifyAuthFarm.bind(this);
        this.csrf = this.csrf.bind(this);
        this.axios = this.axios.bind(this);
        this.axios();
    }
    axios() {
        var self = this;
        axios.interceptors.response.use(
            function(response) {
                if (typeof response.data.auth !== "undefined") {
                    if (!response.data.auth) {
                        if (self.state.authenticated) {
                            self.logout();
                        }
                    }
                }
                return response;
            },
            function(error) {
                if (typeof error.response.data.auth !== "undefined") {
                    if (!error.response.data.auth) {
                        if (self.state.authenticated) {
                            self.logout();
                        }
                    }
                }
                if (typeof error.response.data.errors !== "undefined") {
                    if (
                        typeof error.response.data.errors.expired !==
                        "undefined"
                    ) {
                        self.csrf(error.response.data.token);
                        /*  swal({
                            title: 'Success!',
                            text: error.response.data.errors.expired,
                            type: 'error',
                            confirmButtonColor: '#DD6B55',
                            confirmButtonText: error.response.data.accept,
                        }).then(function() {
                        }); */
                    }
                }
                return Promise.reject(error.response);
            }
        );
    }
    csrf(token) {
        window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
        if (!this.csrfTime) {
            setTimeout(() => {
                this.csrfTime = false;
            }, 5000);
            this.setState({ CSRF: true });
            this.csrfTime = true;
        }
    }
    login() {
        this.setState({ authenticated: true, login: true });
    }
    logout() {
        this.setState({ authenticated: false, login: false });
    }
    loginFarm(idFarm) {
        console.log(idFarm);
        axios({
            method: "post",
            url: "./verifyFarmAuth/" + idFarm
        })
            .then(result => {
                this.setState({ loginFarm: true });
            })
            .catch(err => {});
    }
    logoutFarm() {
        this.setState({ loginFarm: false });
    }
    varifyAuthFarm(pathName) {
        if (pathName === "/farms" && this.state.loginFarm === false) {
            return true;
        } else if (this.state.loginFarm === true) {
            return true;
        } else {
            console.log(this.state.loginFarm);
            /* this.setState({ loginFarm: true }); */
            return false;
        }
    }
    render() {
        return (
            <HashRouter>
                <Switch>
                    <AuthUser
                        exact
                        path="/login"
                        name="Login Page"
                        component={props => (
                            <Login
                                {...props}
                                userAuth={{
                                    login: this.login,
                                    logout: this.logout
                                }}
                            />
                        )}
                        redirectTo="/farms"
                        authenticated={!this.state.login}
                    />
                    <Route
                        exact
                        path="/register"
                        name="Register Page"
                        component={Register}
                    />
                    <Route
                        exact
                        path="/404"
                        name="Page 404"
                        component={Page404}
                    />
                    <Route
                        exact
                        path="/404"
                        name="Page 404"
                        component={Page404}
                    />
                    <Route
                        exact
                        path="/500"
                        name="Page 500"
                        component={Page500}
                    />
                    <Route exact path="/home" name="Home" component={Home} />
                    <AuthUser
                        path="/"
                        name="root"
                        component={props => (
                            <DefaultLayout
                                {...props}
                                userAuth={{
                                    login: this.login,
                                    logout: this.logout
                                }}
                                farmAuth={{
                                    loginFarm: this.loginFarm,
                                    logoutFarm: this.logoutFarm
                                }}
                            />
                        )}
                        redirectTo="/login"
                        authenticated={this.state.authenticated}
                    />
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
