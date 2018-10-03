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
import { I18n } from 'react-i18next';
import update from 'immutability-helper';
import Link from 'react-router-dom/Link';
import classNames from 'classnames';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.loginSubmit = this.loginSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            sendLogin: false,
            email: '',
            password: '',
            errors: {
                inputs: { email: false, password: false },
                messages: { email: '', password: '' },
            },
        };
    }

    loginSubmit() {
        this.setState({ sendLogin: true });
        return axios({
            method: 'post',
            url: './login',
            data: { email: this.state.email, password: this.state.password },
        })
            .then(res => {
                this.setState({ sendLogin: false });
                if (typeof res.data.success !== 'undefined' || typeof res.data.auth !== 'undefined') {
                    this.props.userAuth.login();
                }
                if (typeof res.data.errors !== 'undefined') {
                    var errors = res.data.errors;
                    this.setState({
                        errors: {
                            inputs: { email: false, password: false },
                            messages: { email: '', password: '' },
                        },
                    });
                    if (typeof errors.email !== 'undefined') {
                        this.errorsChange('email', errors.email);
                    }
                    if (typeof errors.password !== 'undefined') {
                        this.errorsChange('password', errors.password);
                    }
                }
            })
            .catch(res => {
                this.setState({ sendLogin: false });
                if (typeof res.data.errors !== 'undefined') {
                    var errors = res.data.errors;
                    this.setState({
                        errors: {
                            inputs: { email: false, password: false },
                            messages: { email: '', password: '' },
                        },
                    });
                    if (typeof errors.email !== 'undefined') {
                        this.errorsChange('email', errors.email);
                    }
                    if (typeof errors.password !== 'undefined') {
                        this.errorsChange('password', errors.password);
                    }
                }
            });
    }

    errorsChange(position, message) {
        this.setState({
            errors: update(this.state.errors, {
                inputs: { $merge: { [position]: true } },
                messages: { $merge: { [position]: message } },
            }),
        });
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value,
        });
    }
    render() {
        return (
            <I18n ns="login">
                {(t, { i18n }) => (
                    <Card className="p-4">
                        <div className="tileAnimation">
                            <CardBody>
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
                                            className={this.state.errors.inputs.email ? 'is-invalid' : ''}
                                            type="text"
                                            placeholder={t('emailTitle')}
                                            autoComplete="email"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.handleInputChange}
                                        />
                                        <FormFeedback>{this.state.errors.messages.email}</FormFeedback>
                                    </InputGroup>
                                    <InputGroup className="mb-4">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="fa fa-lock" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            className={this.state.errors.inputs.password ? 'is-invalid' : ''}
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
                                        <FormFeedback>{this.state.errors.messages.password}</FormFeedback>
                                    </InputGroup>
                                    <Row>
                                        <Col sm="12" lg="6">
                                            <Button
                                                color="primary"
                                                className="w-100 px-4 text-truncate"
                                                onClick={this.loginSubmit}
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
                                            <Button color="link" className="text-truncate w-100 px-0">
                                                {t('forgotPassword')}
                                            </Button>
                                        </Col>
                                    </Row>
                                </React.Fragment>
                            </CardBody>
                            <div
                                className={classNames(
                                    {
                                        'd-none': this.state.sendLogin === false,
                                    },
                                    'overlay'
                                )}
                            >
                                <div className="m-loader mr-4">
                                    <svg className="m-circular" viewBox="25 25 50 50">
                                        <circle
                                            className="path"
                                            cx="50"
                                            cy="50"
                                            r="20"
                                            fill="none"
                                            strokeWidth="4"
                                            strokeMiterlimit="10"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Card>
                )}
            </I18n>
        );
    }
}

export default LoginComponent;
