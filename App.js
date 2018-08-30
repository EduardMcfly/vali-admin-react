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
import {AuthUser} from "./controllers/auth";
// Pages
import { Login, Page404, Page500, Register,Home } from './views/Pages';

// import { renderRoutes } from 'react-router-config';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {component:DefaultLayout };
        this.authenticated = true
    }
    sendRequest() {
        return axios({
            method: "post",
            url: "./verifyAuth"
        }).then(res => {
            if (!res.data["0"]) {
                console.log(res)
                this.setState({ component: Login});
            }else{
                this.authenticated=true;
            }
        }).catch(error =>{
            if (!error.data["0"]) {
                this.setState({ component: Login});
            }else{
                this.authenticated=true;
            }
        });
    }
    render() {
        return <HashRouter>
                <Switch>
                    <Route exact path="/login" name="Login Page" component={Login} />
                    <Route exact path="/register" name="Register Page" component={Register} />
                    <Route exact path="/404" name="Page 404" component={Page404} />
                    <Route exact path="/404" name="Page 404" component={Page404} />
                    <Route exact path="/500" name="Page 500" component={Page500} />
                    <Route exact path="/home" name="Home" component={Home} />
                    <AuthUser path="/" name="root" function={this.sendRequest()} component={this.state.component} redirectTo="/login" authenticated={this.authenticated}  />
                </Switch>
            </HashRouter>;
    }
}

export default App;
