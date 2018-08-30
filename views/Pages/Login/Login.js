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
    Row
} from "reactstrap";
import { I18n, Trans } from "react-i18next";
import AuthUser  from "../../../controllers/auth";
import Link from "react-router-dom/Link";

class Login extends Component {
    render() {
        return (
            <div className="app flex-row align-items-center">
                <I18n ns="header">
                    {(t, { i18n }) => (
                        <header className="app-header pr-1">
                            <a className="app-header__logo" href="#home">
                                Cosva
                            </a>
                            <ul className="app-nav">
                                <li className="dropdown">
                                    <a
                                        className="app-nav__item"
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
                    <I18n ns="login">
                        {(t, { i18n }) => (
                            <Row className="justify-content-center">
                                <Col md="12" lg="10">
                                    <CardGroup>
                                        <Card className="p-4">
                                            <CardBody>
                                                <div>
                                                    <h1>{t("loginTitle")}</h1>
                                                    <p className="text-muted">
                                                        {t("loginSubtitle")}
                                                    </p>
                                                    <InputGroup className="mb-3">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="icon-user" />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            type="text"
                                                            placeholder={t(
                                                                "emailTitle"
                                                            )}
                                                            autoComplete="username"
                                                        />
                                                    </InputGroup>
                                                    <InputGroup className="mb-4">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="icon-lock" />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            type="password"
                                                            placeholder={t(
                                                                "password"
                                                            )}
                                                            autoComplete="current-password"
                                                        />
                                                    </InputGroup>
                                                    <Row>
                                                        <Col sm="12" lg="6">
                                                            <Link to="./dashboard"
                                                                color="primary"
                                                                className="w-100 px-4 text-truncate"
                                                            >
                                                                {t(
                                                                    "loginTitle"
                                                                )}
                                                            </Link>
                                                            <Button
                                                                color="primary"
                                                                className="w-100 px-4 text-truncate"
                                                            >
                                                                {t("cancel")}
                                                            </Button>
                                                        </Col>
                                                        <Col
                                                            sm="12"
                                                            lg="6"
                                                            className="text-right"
                                                        >
                                                            <Button
                                                                color="link"
                                                                className="text-truncate w-100 px-0"
                                                            >
                                                                {t(
                                                                    "forgotPassword"
                                                                )}
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </CardBody>
                                        </Card>
                                        <Card
                                            className="d-none d-md-block text-white bg-primary py-5 d-md-down-none"
                                            style={{ width: 44 + "%" }}
                                        >
                                            <CardBody className="text-center">
                                                <div>
                                                    <h2>Sign up</h2>
                                                    <p>
                                                        Lorem ipsum dolor sit
                                                        amet, consectetur
                                                        adipisicing elit, sed do
                                                        eiusmod tempor
                                                        incididunt ut labore et
                                                        dolore magna aliqua.
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
                </Container>
            </div>
        );
    }
}

export default Login;
