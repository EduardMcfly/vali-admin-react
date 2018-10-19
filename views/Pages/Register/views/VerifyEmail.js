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

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sendLogin: false,
            emailError: { message: false },
            errors: { inputs: { email: false }, messages: { email: "" } }
        };
        this.emailVerifySubmit = this.emailVerifySubmit.bind(this);
    }

    resetErrosInputs() {
        this.setState({
            emailError: { message: false }
        });
    }

    emailVerifySubmit() {
        this.setState({ sendLogin: true });
        return axios({
            method: "post",
            url: "./registerVerifyEmail",
            data: { email: this.props.state.email }
        })
            .then(res => {
                if (typeof res.data.success !== "undefined") {
                    this.props.userAuth.login();
                } else if (typeof res.data.errors !== "undefined") {
                    this.setState({ sendLogin: false });
                    var errors = res.data.errors;
                    this.errorInputs(errors);
                }
            })
            .catch(res => {
                this.setState({ sendLogin: false });
                if (typeof res.data.errors !== "undefined") {
                    var errors = res.data.errors;
                    this.errorInputs(errors);
                }
            });
    }

    errorInputs(errors) {
        this.resetErrosInputs();
        this.errorInput(errors.email, "emailError");
    }

    errorInput(error, input) {
        if (typeof error !== "undefined") {
            this.errorsChange(error, input);
        }
    }

    errorsChange(error, input) {
        this.setState({
            [input]: { message: error }
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
                                                className={classNames({
                                                    "is-invalid": this.state
                                                        .emailError.message
                                                })}
                                                type="text"
                                                placeholder={t("emailTitle")}
                                                autoComplete="email"
                                                name="email"
                                                value={this.props.state.email}
                                                onChange={this.props.setEmail}
                                                onKeyUp={this.props.setEmail}
                                            />
                                            <FormFeedback>
                                                {this.state.emailError.message}
                                            </FormFeedback>
                                        </InputGroup>
                                        <Button
                                            color={classNames("success", {
                                                disabled:
                                                    this.props.state
                                                        .emailValidate === false
                                            })}
                                            block
                                            onClick={() => {
                                                if (
                                                    this.props.state
                                                        .emailValidate
                                                ) {
                                                    this.emailVerifySubmit();
                                                }
                                            }}
                                        >
                                            {t("confirmEmail")}
                                        </Button>
                                    </div>
                                    <Link to={"/register/token"}>
                                        <Button color="link" block>
                                            <InputGroup className="mb-3 align-items-center">
                                                <i
                                                    className={"fa fa-user p-2"}
                                                />
                                                {t("haveCode")}
                                            </InputGroup>
                                        </Button>
                                    </Link>
                                    <Link to={"/login"}>
                                        <Button color="link" block>
                                            {"<< " + t("haveLogin")}
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
                                {console.log()}
                            </Card>
                        </Col>
                    </Row>
                )}
            </I18n>
        );
    }
}

export default VerifyEmail;
