import React, { Component } from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Row
} from "reactstrap";
import { I18n } from "react-i18next";
import Link from "react-router-dom/Link";
import axios from "axios";
import Inputs from "../components/Inputs";
import { Overlay, MessagesTranslate } from "../../../../components";

class ResgisterUser extends Component {
    constructor(props) {
        super(props);
        this.validations = true;
        this.tokenSubmit = this.tokenSubmit.bind(this);
        this.state = {
            name: "",
            lastName: "",
            number: "",
            birthDate: "",
            password: "",
            confirmPassword: "",
            sendEmailToken: false,
            nameError: { message: false, state: false },
            lastNameError: { message: false, state: false },
            numberError: { message: false, state: false },
            birthDateError: { message: false, state: false },
            passwordError: { message: false, state: false },
            confirmPasswordError: { message: false, state: false }
        };
        this.setInputs = this.setInputs.bind(this);
        this.resetErrosInputs = this.resetErrosInputs.bind(this);
        this.resetErrosInput = this.resetErrosInput.bind(this);
        this.validateInputs = this.validateInputs.bind(this);
    }

    setInputs(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    resetErrosInput({ input }) {
        this.setState({
            [input]: { message: false, state: false }
        });
    }
    resetErrosInputs() {
        this.validations = true;
        this.setState({
            sendEmailToken: false,
            emailError: { message: false, state: false },
            codeError: { message: false, state: false }
        });
    }

    errorInputs(errors) {
        if (typeof errors.sendEmail !== "undefined") {
            this.setState({ sendEmailToken: true });
        }
        this.errorInput(errors.email, "emailError");
        this.errorInput(errors.code, "codeError");
    }

    errorInput(error, input) {
        if (typeof error !== "undefined") {
            this.errorsSet(error, input);
        }
    }

    errorsSet(error, input) {
        if (this.validations) {
            this.validations = false;
        }
        this.setState({
            [input]: { message: error, state: true }
        });
    }

    validateInputs() {
        this.resetErrosInputs();
        if (!this.props.verifyEmail()) {
            this.errorInput(<MessagesTranslate type={"email"} />, "emailError");
        }
        if (!this.props.verifyCode()) {
            this.errorInput(
                <MessagesTranslate
                    type={"numeric"}
                    attribute={this.props.code.input}
                />,
                "codeError"
            );
        }
        return this.validations;
    }

    tokenSubmit() {
        if (this.validateInputs()) {
            const { toggleOverlay } = this.props;
            toggleOverlay(true);
            axios({
                method: "post",
                url: "./registerVerifyPin",
                data: {
                    email: this.props.email.input,
                    code: this.props.code.input
                }
            })
                .then(res => {
                    toggleOverlay(false);
                    if (typeof res.data.success !== "undefined") {
                        this.props.history.push("/register/registerUser");
                    } else if (typeof res.data.errors !== "undefined") {
                        toggleOverlay(false);
                        var errors = res.data.errors;
                        this.errorInputs(errors);
                    }
                })
                .catch(res => {
                    toggleOverlay(false);
                    if (typeof res.data.errors !== "undefined") {
                        var errors = res.data.errors;
                        this.errorInputs(errors);
                    }
                });
        }
    }

    render() {
        return (
            <I18n ns={["register"]}>
                {t => (
                    <Row className="justify-content-center">
                        <Col sm={"12"} md={"9"} lg={"6"} xl={"6"}>
                            <Card className="mx-4 tileAnimation">
                                <React.Fragment>
                                    <CardHeader>
                                        <h1>{t("registerTitle")}</h1>
                                        <p className="text-muted">
                                            {t("registerSubtitle")}
                                        </p>
                                    </CardHeader>
                                    <CardBody className="p-4">
                                        <Inputs
                                            classError={
                                                this.state.nameError.state
                                            }
                                            placeholder={t("name")}
                                            autoComplete={"off"}
                                            name={"name"}
                                            value={this.state.name}
                                            onChange={e => {
                                                this.setInputs(e);
                                                if (
                                                    this.state.nameError.message
                                                ) {
                                                    this.resetErrosInput({
                                                        input: "nameError"
                                                    });
                                                }
                                            }}
                                            icon={"fa fa-info-circle"}
                                            errorMessage="342343"
                                        />
                                        <Inputs
                                            classError={
                                                this.state.nameError.state
                                            }
                                            placeholder={t("lastName")}
                                            autoComplete={"off"}
                                            name={"lastName"}
                                            value={this.state.lastName}
                                            onChange={e => {
                                                this.setInputs(e);
                                                if (
                                                    this.state.lastNameError
                                                        .message
                                                ) {
                                                    this.resetErrosInput({
                                                        input: "lastNameError"
                                                    });
                                                }
                                            }}
                                            icon={"fa fa-info"}
                                            errorMessage="342343"
                                        />
                                        <Inputs
                                            type={"date"}
                                            classError={
                                                this.state.birthDateError.state
                                            }
                                            placeholder={t("birthDate")}
                                            name={"birthDate"}
                                            value={this.state.birthDate}
                                            onChange={e => {
                                                this.setInputs(e);
                                                if (
                                                    this.state.birthDateError
                                                        .message
                                                ) {
                                                    this.resetErrosInput({
                                                        input: "birthDateError"
                                                    });
                                                }
                                            }}
                                            icon={"fa fa-id-card-o"}
                                            errorMessage="342343"
                                        />
                                        <Inputs
                                            type={"number"}
                                            classError={
                                                this.state.numberError.state
                                            }
                                            placeholder={t("number")}
                                            name={"number"}
                                            value={this.state.number}
                                            onChange={e => {
                                                this.setInputs(e);
                                                if (
                                                    this.state.numberError
                                                        .message
                                                ) {
                                                    this.resetErrosInput({
                                                        input: "numberError"
                                                    });
                                                }
                                            }}
                                            icon={"fa fa-hashtag"}
                                            errorMessage="342343"
                                        />
                                        <Inputs
                                            classError={
                                                this.state.passwordError.state
                                            }
                                            placeholder={t("password")}
                                            name={"password"}
                                            value={this.state.password}
                                            onChange={e => {
                                                this.setInputs(e);
                                                if (
                                                    this.state.passwordError
                                                        .message
                                                ) {
                                                    this.resetErrosInput({
                                                        input: "passwordError"
                                                    });
                                                }
                                            }}
                                            icon={"fa  fa-circle-o-notch"}
                                            errorMessage="342343"
                                        />
                                        <Inputs
                                            classError={
                                                this.state.confirmPasswordError
                                                    .state
                                            }
                                            placeholder={t("passwordConfirm")}
                                            name={"confirmPassword"}
                                            value={this.state.confirmPassword}
                                            onChange={e => {
                                                this.setInputs(e);
                                                if (
                                                    this.state
                                                        .confirmPasswordError
                                                        .message
                                                ) {
                                                    this.resetErrosInput({
                                                        input:
                                                            "confirmPasswordError"
                                                    });
                                                }
                                            }}
                                            icon={"fa fa-dot-circle-o"}
                                            errorMessage="342343"
                                        />
                                        <Button
                                            onClick={() => this.tokenSubmit()}
                                            color="info"
                                            block
                                        >
                                            {t("confirm")}
                                        </Button>
                                    </CardBody>
                                    <CardFooter className="p-4">
                                        <Row>
                                            <Col
                                                xs="6"
                                                sm="6"
                                                className={"mx-auto"}
                                            >
                                                <Link to={"/register"}>
                                                    <Button
                                                        color={"success"}
                                                        block
                                                        size={"sm"}
                                                    >
                                                        {t("back")}
                                                    </Button>
                                                </Link>
                                            </Col>
                                        </Row>
                                    </CardFooter>
                                    <Overlay state={this.props.overlay} />
                                </React.Fragment>
                            </Card>
                        </Col>
                    </Row>
                )}
            </I18n>
        );
    }
}
export default ResgisterUser;
