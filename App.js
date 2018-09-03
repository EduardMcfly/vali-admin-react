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
import { AuthUser } from "./controllers/auth";
// Pages
import { Login, Page404, Page500, Register, Home } from "./views/Pages";

// import { renderRoutes } from 'react-router-config';

class App extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            authenticated: true,
            login: false
        };
    }
    login() {
        this.setState({ authenticated: true, login: true });
    }
    logout() {
        this.setState({ authenticated: false, login: false });
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
