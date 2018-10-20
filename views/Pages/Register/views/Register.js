import React, { Component } from "react";
import {
    Button,
    Card,
    CardBody,
    Col,
    Input,
    FormFeedback,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from "reactstrap";
import { I18n } from "react-i18next";
import Link from "react-router-dom/Link";
import classNames from "classnames";
import { CircleAnimation } from "../../../../components/Animations";
 import axios from "axios";

// routes config

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sendLogin: false,
            emailValidate: false,
            email: "",
            errors: { inputs: { email: false }, messages: { email: "" } }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.emailVerifySubmit = this.emailVerifySubmit.bind(this);
    }

    emailVerifySubmit() {
        this.setState({ sendLogin: true });
        return axios({
            method: "post",
            url: "./registerVerifyEmail",
            data: { email: this.state.email }
        })
            .then(res => {
                if (typeof res.data.success !== "undefined") {
                    this.props.userAuth.login();
                } else if (typeof res.data.errors !== "undefined") {
                    this.setState({ sendLogin: false });
                    var errors = res.data.errors;
                    if (typeof errors.email !== "undefined") {
                        this.errorsChange("email", errors.email);
                    }
                }
            })
            .catch(res => {
                this.setState({ sendLogin: false });
                if (typeof res.data.errors !== "undefined") {
                    var errors = res.data.errors;
                    this.setState({
                        errors: {
                            inputs: { email: false, password: false },
                            messages: { email: "", password: "" }
                        }
                    });
                    if (typeof errors.email !== "undefined") {
                        this.errorsChange("email", errors.email);
                    }
                }
            });
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        if ("email" == name) {
            if (this.state.email.indexOf("@") !== -1) {
                this.setState({
                    emailValidate: true
                });
            } else {
                this.setState({
                    emailValidate: false
                });
            }
        }
        this.setState({
            [name]: value
        });
    }
    render() {
        return (
            <I18n ns="register">
                {(t, { i18n }) => (
                    <Row className="justify-content-center">
                        <Col md={"9"} lg={"7"} xl={"6"}>
                            <Card className="tileAnimation">
                                <CardBody className="p-4">
                                    <div>
                                        <h1>{t("registerTitle")}</h1>
                                        <p className="text-muted">
                                            {t("registerSubtitle")}
                                        </p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-user" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                className={
                                                    this.state.errors.inputs
                                                        .email
                                                        ? "is-invalid"
                                                        : ""
                                                }
                                                type="text"
                                                placeholder={t("emailTitle")}
                                                autoComplete="email"
                                                name="email"
                                                value={this.state.email}
                                                onChange={
                                                    this.handleInputChange
                                                }
                                                onKeyUp={this.handleInputChange}
                                            />
                                            <FormFeedback>
                                                {
                                                    this.state.errors.messages
                                                        .email
                                                }
                                            </FormFeedback>
                                        </InputGroup>
                                        <Button
                                            color={classNames("success", {
                                                disabled:
                                                    this.state.emailValidate ===
                                                    false
                                            })}
                                            block
                                            onClick={() => {
                                                if (this.state.emailValidate) {
                                                    this.emailVerifySubmit();
                                                }
                                            }}
                                        >
                                            {t("confirmEmail")}
                                        </Button>
                                    </div>
                                    {/* <Row className={"my-2"}>
                                        <Col xs="12" sm="6">
                                            <Button className={""} block>
                                                <span>facebook</span>
                                            </Button>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <Button className={""} block>
                                                <span>twitter</span>
                                            </Button>
                                        </Col>
                                    </Row> */}
                                    <Link to={"/login"}>
                                        <Button color="link" block>
                                            {t("haveLogin")}
                                        </Button>
                                    </Link>
                                </CardBody>
                                <div
                                    className={classNames(
                                        {
                                            "d-none":
                                                this.state.sendLogin === false
                                        },
                                        "overlay"
                                    )}
                                >
                                    <CircleAnimation width={"70px"} />
                                </div>
                                <Link to={"/register/token"}>Token</Link>
                            </Card>
                        </Col>
                    </Row>
                )}
            </I18n>
        );
    }
}

export default Register;
