import React, { Component } from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
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
import EmailInput from "../components/EmailInput";

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
        this.resetErrosInputs = this.resetErrosInputs.bind(this);
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
            data: { email: this.props.email.input }
        })
            .then(res => {
                if (typeof res.data.success !== "undefined") {
                    this.props.history.push('/register/token/')
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
                        <Col sm={"12"} md={"9"} lg={"6"} xl={"6"}>
                            <Card className="tileAnimation">
                                <CardBody className="pb-0">
                                    <div>
                                        <h1>{t("registerTitle")}</h1>
                                        <p className="text-muted">
                                            {t("registerSubtitle")}
                                        </p>
                                        <EmailInput
                                            value={this.props.email.input}
                                            setEmail={this.props.setEmail}
                                            emailError={this.state.emailError.message}
                                            resetErrosInputs={this.resetErrosInputs}
                                        />
                                        <Button
                                            color={classNames("success", {
                                                disabled:
                                                    this.props.verifyEmail() === false
                                            })}
                                            block
                                            onClick={() => {
                                                if (
                                                    this.props.verifyEmail()
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
                                            <InputGroup className="d-block align-items-center">
                                                <i
                                                    className={"fa fa-user p-2"}
                                                />
                                                {t("haveCode")}
                                            </InputGroup>
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
                                <CardFooter className="p-0">
                                    <Row>
                                        <Col
                                            xs="6"
                                            sm="6"
                                            className={"mx-auto"}
                                        >
                                            <Link to={"/register"}>
                                                <Button
                                                    color={"link"}
                                                    block
                                                    size={"sm"}
                                                >
                                                    {t("haveLogin")}
                                                </Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                )}
            </I18n>
        );
    }
}

export default VerifyEmail;
