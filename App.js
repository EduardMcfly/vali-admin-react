import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
/* import './scss/style.css'; */
import '../sass/app.css';

// Containers
import { DefaultLayout } from './containers';
// Pages
import { Login, Page404, Page500, Register,Home } from './views/Pages';

// import { renderRoutes } from 'react-router-config';

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
    },
};
fakeAuth.signout();


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (fakeAuth.isAuthenticated === true ? <Component {...props} /> : <Redirect to="/login" />)}
    />
);

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/login" name="Login Page" component={Login} />
                    <Route exact path="/register" name="Register Page" component={Register} />
                    <Route exact path="/404" name="Page 404" component={Page404} />
                    <Route exact path="/404" name="Page 404" component={Page404} />
                    <Route exact path="/500" name="Page 500" component={Page500} />
                    <Route exact path="/home" name="Home" component={Home} />
                    <PrivateRoute path="/" name="Home" component={DefaultLayout} />
                </Switch>
            </HashRouter>
        );
    }
}

export default App;