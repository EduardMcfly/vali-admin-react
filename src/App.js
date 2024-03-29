import React, { Component } from 'react';
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// Styles
import './app.css';

import i18next from './i18n';

// Containers
import { DefaultLayout } from './containers';
import { RenderRoute, AuthFarm } from './controllers';
// Pages
import {
  Login,
  Page404,
  Page500,
  Register,
  Home,
} from './views/Pages';
import { setTimeout } from 'timers';

import axios from 'axios';

import swal from 'sweetalert2';
// for current language

class App extends Component {
  constructor(props) {
    super(props);
    this.csrfTime = false;
    this.authenticatedUser = true;
    this.state = {
      authenticated: true,
      login: true,
      CSRF: false,
      loginFarm: false,
      farmAuthenticated: false,
    };
    this.authenticatedState = this.authenticatedState.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.loginFarm = this.loginFarm.bind(this);
    this.logoutFarm = this.logoutFarm.bind(this);
    this.varifyAuthFarm = this.varifyAuthFarm.bind(this);
    this.csrf = this.csrf.bind(this);
    this.axios = this.axios.bind(this);
    this.updateComponents = this.updateComponents.bind(this);
  }

  componentDidMount() {
    this.axios();
    this.sendRequest();
  }

  sendRequest() {
    axios({
      method: 'post',
      url: './verifyAuth',
    });
  }

  axios() {
    var self = this;
    var count = true;
    axios.interceptors.response.use(
      function(response) {
        if (typeof response.data.auth !== 'undefined') {
          if (!response.data.auth) {
            if (self.state.authenticated) {
              self.logout();
            }
          }
        }
        if (typeof response.data.csrf_token !== 'undefined') {
          self.csrf(response.data.csrf_token);
        }
        return response;
      },
      function(error) {
        if (!navigator.onLine) {
          if (count) {
            swal({
              type: 'error',
              title: i18next.t('offline'),
              showConfirmButton: false,
            });
            setTimeout(() => {
              count = true;
            }, 4000);
            count = false;
          }
          return { errors: { data: i18next.t('offline') } };
        }
        if (
          typeof error.response.data.errors.conection !== 'undefined'
        ) {
          swal({
            type: 'error',
            title: i18next.t('errorDB'),
            showConfirmButton: false,
          });
          return { errors: { data: i18next.t('offline') } };
        }
        if (typeof error.response.data.auth !== 'undefined') {
          if (!error.response.data.auth) {
            if (self.state.authenticated) {
              self.logout();
            }
          }
        }
        if (typeof error.response.data.errors !== 'undefined') {
          if (
            typeof error.response.data.errors.expired !== 'undefined'
          ) {
            self.csrf(error.response.data.csrf_token, true);
          }
        }
        return Promise.reject(error.response);
      },
    );
  }
  csrf(token, reload = false) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
    if (!this.csrfTime && reload) {
      setTimeout(() => {
        this.csrfTime = false;
      }, 5000);
      this.setState({ CSRF: true });
      this.csrfTime = true;
    }
  }
  updateComponents() {
    this.forceUpdate();
  }
  authenticatedState() {
    return this.state.authenticated && this.authenticatedUser;
  }
  login() {
    this.authenticatedUser = true;
    this.setState({
      authenticated: true,
      login: false,
    });
  }
  logout() {
    this.authenticatedUser = false;
    this.setState({
      authenticated: false,
      login: true,
    });
  }
  loginFarm(idFarm) {
    axios({
      method: 'post',
      url: './verifyFarmAuth/' + idFarm,
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
    if (pathName === '/farms' && this.state.loginFarm === false) {
      return true;
    } else if (this.state.loginFarm === true) {
      return true;
    } else {
      console.log(this.state.loginFarm);
      return false;
    }
  }
  render() {
    return (
      <React.Suspense fallback={null}>
        <HashRouter>
          <Switch>
            <RenderRoute
              exact
              path="/login"
              name="Login Page"
              component={props => {
                this.authenticatedUser = false;
                return (
                  <Login
                    {...props}
                    userAuth={{
                      login: this.login,
                      authenticatedState: this.authenticatedState,
                    }}
                  />
                );
              }}
              redirectTo="/farms"
              authenticated={this.state.login}
            />
            <RenderRoute
              path="/register/"
              name="Login Page"
              component={props => {
                this.authenticatedUser = false;
                return (
                  <Register
                    {...props}
                    userAuth={{
                      authenticatedState: this.authenticatedState,
                    }}
                  />
                );
              }}
              redirectTo="/farms"
              authenticated={this.state.login}
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
            <RenderRoute
              path="/"
              name="root"
              component={props => (
                <DefaultLayout
                  {...props}
                  userAuth={{
                    login: this.login,
                    logout: this.logout,
                    authenticatedState: this.authenticatedState,
                  }}
                  farmAuth={{
                    loginFarm: this.loginFarm,
                    logoutFarm: this.logoutFarm,
                  }}
                  updateAll={this.updateComponents}
                />
              )}
              redirectTo="/login"
              authenticated={this.state.authenticated}
            />
          </Switch>
        </HashRouter>
      </React.Suspense>
    );
  }
}

export default App;
