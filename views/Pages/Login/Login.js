import React, { Component } from "react";
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    FormFeedback
} from "reactstrap";
import { I18n, Trans } from "react-i18next";
import Link from "react-router-dom/Link";
import { log } from "util";
import { LoginComponent } from "../../../components";

class Login extends Component {
    constructor(props) {
        super(props);
        this.sendRequest = this.sendRequest.bind(this);
        this.sendRequest();
    }

    sendRequest() {
        return axios({
            method: "post",
            url: "./verifyAuth"
        })
            .then(res => {
                if (typeof res.data.auth !== "undefined") {
                    if (res.data.auth) {
                        this.props.userAuth.login();
                    }
                }
            })
            .catch(error => {
                if (typeof error.data.redirect !== "undefined") {
                    this.props.userAuth.login();
                }

                if (typeof error.data.auth !== "undefined") {
                    if (res.data.auth) {
                        this.props.userAuth.login();
                    }
                }
            });
    }
    render() {
        return (
            <div className="app flex-row align-items-center">
                <I18n ns="header">
                    {(t, { i18n }) => (
                        <header className="app-header pr-1">
                            <a className="app-headerLogo" href="#home">
                                Cosva
                            </a>
                            <ul className="app-nav">
                                <li className="dropdown">
                                    <a
                                        className="app-navItem"
                                        href="#"
                                        data-toggle="dropdown"
                                        aria-label="Open Profile Menu"
                                    >
                                        <i className="fa fa-ellipsis-v fa-2x" />
                                    </a>
                                    <ul className="dropdown-menu settings-menu dropdown-menu-right">
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={() =>
                                                    i18n.changeLanguage("es")
                                                }
                                            >
                                                <i className="fa fa-language fa-lg" />
                                                Español
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={() =>
                                                    i18n.changeLanguage("en")
                                                }
                                            >
                                                |{" "}
                                                <i className="fa fa-language fa-lg" />
                                                English
                                            </button>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="{{ route('logout') }}"
                                            >
                                                <i className="fa fa-sign-out fa-lg" />
                                                {t("exit")}
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </header>
                    )}
                </I18n>
                <Container>
                    <div
                        className="app-content ml-0"
                        style={{ minHeight: "unset" }}
                    >
                        <I18n ns="login">
                            {(t, { i18n }) => (
                                <Row className="justify-content-center">
                                    <Col md="12" lg="10">
                                        <CardGroup>
                                            <LoginComponent
                                                userAuth={this.props.userAuth}
                                            />
                                            <Card
                                                className="d-none d-md-block text-white bg-primary py-5"
                                                style={{ width: 44 + "%" }}
                                            >
                                                <CardBody className="text-center">
                                                    <div>
                                                        <h2>Sign up</h2>
                                                        <p>
                                                            Lorem ipsum dolor
                                                            sit amet,
                                                            consectetur
                                                            adipisicing elit,
                                                            sed do eiusmod
                                                            tempor incididunt ut
                                                            labore et dolore
                                                            magna aliqua.
                                                        </p>
                                                        <Button
                                                            color="primary"
                                                            className="mt-3"
                                                            active
                                                        >
                                                            Register Now!
                                                        </Button>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </CardGroup>
                                    </Col>
                                </Row>
                            )}
                        </I18n>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Login;
