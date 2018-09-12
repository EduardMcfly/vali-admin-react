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
import { I18n, Trans } from 'react-i18next';
import update from 'immutability-helper';
import { log } from 'util';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.loginSubmit = this.loginSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            email: '',
            password: '',
            errors: {
                inputs: { email: false, password: false },
                messages: { email: '', password: '' },
            },
        };
    }

    loginSubmit() {
        console.log('====================================');
        console.log(33243);
        console.log('====================================');
        /*         return axios({
            method: 'post',
            url: './login',
            data: { email: this.state.email, password: this.state.password },
        })
            .then(res => {
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
            }); */
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
                        <div className="overlay d-flex justify-content-center">
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
                        <CardBody>
                            <div>
                                <h1>{t('loginTitle')}</h1>
                                <p className="text-muted">{t('loginSubtitle')}</p>
                                <InputGroup className="mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="icon-user" />
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
                                            <i className="icon-lock" />
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
                                        <Button
                                            color="info"
                                            className="mt-3 w-100 px-4 text-truncate d-md-none d-sm-block"
                                        >
                                            {t('registerTitle')}
                                        </Button>
                                    </Col>
                                    <Col sm="12" lg="6" className="text-right">
                                        <Button color="link" className="text-truncate w-100 px-0">
                                            {t('forgotPassword')}
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                )}
            </I18n>
        );
    }
}

export default LoginComponent;
