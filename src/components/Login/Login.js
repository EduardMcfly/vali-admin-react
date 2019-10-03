import React, { Component } from 'react';
import {
  Button,
  CardBody,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Card,
  FormFeedback,
} from 'reactstrap';
import { Translation } from 'react-i18next';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { CircleAnimation } from '../Animations';
import { Overlay } from '..';

import axios from 'axios';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendLogin: false,
      email: '',
      password: '',
      emailError: { message: false },
      passwordError: { message: false },
    };
    this.loginSubmit = this.loginSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  resetErrosInputs() {
    this.setState({
      emailError: { message: false },
      passwordError: { message: false },
    });
  }

  loginSubmit() {
    this.setState({ sendLogin: true });
    axios({
      method: 'post',
      url: './login',
      data: {
        email: this.state.email,
        password: this.state.password,
      },
    })
      .then(res => {
        if (typeof res.data.success !== 'undefined') {
          this.props.userAuth.login();
        } else if (typeof res.data.auth !== 'undefined') {
          this.props.userAuth.login();
        } else if (typeof res.data.errors !== 'undefined') {
          this.setState({ sendLogin: false });
          var errors = res.data.errors;
          this.errorInputs(errors);
        }
      })
      .catch(res => {
        this.setState({ sendLogin: false });
        if (typeof res.data.errors !== 'undefined') {
          var errors = res.data.errors;
          this.errorInputs(errors);
        }
      });
  }

  errorInputs(errors) {
    this.resetErrosInputs();
    this.errorInput(errors.email, 'emailError');
    this.errorInput(errors.password, 'passwordError');
  }

  errorInput(error, input) {
    if (typeof error !== 'undefined') {
      this.errorsChange(error, input);
    }
  }

  errorsChange(error, input) {
    this.setState({
      [input]: { message: error },
    });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <Translation ns="login">
        {(t, { i18n }) => (
          <Card className="p-4">
            <CardBody className="tileAnimation">
              <React.Fragment>
                <h1>{t('loginTitle')}</h1>
                <p className="text-muted">{t('loginSubtitle')}</p>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-user" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className={classNames({
                      'is-invalid': this.state.emailError.message,
                    })}
                    type="text"
                    placeholder={t('emailTitle')}
                    autoComplete="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>
                    {this.state.emailError.message}
                  </FormFeedback>
                </InputGroup>
                <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-lock" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className={classNames({
                      'is-invalid': this.state.passwordError.message,
                    })}
                    type="password"
                    placeholder={t('password')}
                    autoComplete="current-password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    onKeyDown={e => {
                      if (e.keyCode === 13) {
                        this.loginSubmit();
                      }
                    }}
                  />
                  <FormFeedback>
                    {this.state.passwordError.message}
                  </FormFeedback>
                </InputGroup>
                <Row>
                  <Col sm="12" lg="6">
                    <Button
                      color="primary"
                      className="w-100 px-4 text-truncate"
                      onClick={() => {
                        if (!this.state.sendLogin) {
                          this.loginSubmit();
                        }
                      }}
                    >
                      {t('loginTitle')}
                    </Button>
                    <Link to={'/register'}>
                      <Button
                        color="info"
                        className="mt-3 w-100 px-4 text-truncate d-md-none d-sm-block"
                      >
                        {t('registerTitle')}
                      </Button>
                    </Link>
                  </Col>
                  <Col sm="12" lg="6" className="text-right">
                    <Button
                      color="link"
                      className="text-truncate w-100 px-0"
                    >
                      {t('forgotPassword')}
                    </Button>
                  </Col>
                </Row>
              </React.Fragment>
              <Overlay state={this.state.sendLogin} />
            </CardBody>
          </Card>
        )}
      </Translation>
    );
  }
}

export default LoginComponent;
