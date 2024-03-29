import React, { Component } from 'react';
import { Container } from 'reactstrap';
import routes from './routes';
import { Translation } from 'react-i18next';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Header, SwitchWithSlide } from '../../../components';
import { RenderRoute } from '../../../controllers';
import { VerifyEmail, RegisterUser } from './views';
import validator from 'validator';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: false,
      registerState: false,
      email: '',
      code: '',
    };
    this.setInputs = this.setInputs.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.verifyCode = this.verifyCode.bind(this);
    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.verifyRegisterSet = this.verifyRegisterSet.bind(this);
  }

  toggleOverlay(state) {
    this.setState({
      overlay: state,
    });
  }
  setInputs(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  verifyEmail() {
    return validator.isEmail(this.state.email) ? true : false;
  }

  verifyCode() {
    return validator.isNumeric(this.state.code) ? true : false;
  }

  verifyRegisterSet(value = false) {
    this.setState({ registerState: value });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <div className="app-header pr-1">
          <Header {...this.props} />
        </div>
        <Container>
          <div
            className="app-content ml-0"
            style={{ minHeight: 'unset' }}
          >
            <Switch>
              <RenderRoute
                path="/register/registerUser"
                name="Register user"
                component={props => {
                  this.authenticatedUser = false;
                  return (
                    <RegisterUser
                      {...props}
                      setInputs={this.setInputs}
                      toggleOverlay={this.toggleOverlay}
                      overlay={this.state.overlay}
                      verifyRegisterSet={this.verifyRegisterSet}
                      email={{
                        input: this.state.email,
                      }}
                      verifyEmail={this.verifyEmail}
                      code={{
                        input: this.state.code,
                      }}
                      verifyCode={this.verifyCode}
                    />
                  );
                }}
                redirectTo="/register/token"
                authenticated={this.state.registerState}
              />
              <SwitchWithSlide>
                <Route
                  exact
                  path="/register"
                  name="register"
                  render={props => (
                    <VerifyEmail
                      {...props}
                      email={{ input: this.state.email }}
                      overlay={this.state.overlay}
                      toggleOverlay={this.toggleOverlay}
                      setInputs={this.setInputs}
                      verifyEmail={this.verifyEmail}
                    />
                  )}
                />
                {routes.map((r, idx) => {
                  return r.component ? (
                    <Route
                      key={idx}
                      path={r.path}
                      exact={r.exact}
                      name={r.name}
                      render={props => {
                        return (
                          <Translation ns="general">
                            {t => {
                              document.title = t('routes.' + r.name);
                              return (
                                <r.component
                                  {...props}
                                  setInputs={this.setInputs}
                                  toggleOverlay={this.toggleOverlay}
                                  verifyRegisterSet={
                                    this.verifyRegisterSet
                                  }
                                  overlay={this.state.overlay}
                                  email={{
                                    input: this.state.email,
                                  }}
                                  verifyEmail={this.verifyEmail}
                                  code={{
                                    input: this.state.code,
                                  }}
                                  verifyCode={this.verifyCode}
                                />
                              );
                            }}
                          </Translation>
                        );
                      }}
                    />
                  ) : null;
                })}
                <Redirect from="/" to="/register" />
              </SwitchWithSlide>
            </Switch>
          </div>
        </Container>
      </div>
    );
  }
}

export default Register;
