import React, { Component } from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Row,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormFeedback
} from "reactstrap";
import { I18n } from "react-i18next";
import Link from "react-router-dom/Link";
import axios from "axios";
import Inputs from "../components/Inputs";
import { Overlay, MessagesTranslate } from "../../../../components";
import validator from "validator";
import DatePicker from "react-datepicker";
import moment from "moment";
import classNames from "classnames";

class ResgisterUser extends Component {
    constructor(props) {
        super(props);
        this.validations = true;
        this.tokenSubmit = this.tokenSubmit.bind(this);
        this.state = {
            name: "",
            lastName: "",
            number: "",
            birthDate: moment().year(moment().year() - 18),
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
        if (this.state[e.target.name + "Error"].message) {
            this.resetErrosInput({
                input: e.target.name + "Error"
            });
        }
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
                {(t, { i18n }) => (
                    <Row className="justify-content-center">
                        <Col
                            sm={"12"}
                            md={"9"}
                            lg={"6"}
                            xl={"6"}
                            className={"p-0"}
                        >
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
                                            }}
                                            icon={"fa fa-info"}
                                            errorMessage="342343"
                                        />
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText
                                                    className={
                                                        "d-flex justify-content-center"
                                                    }
                                                    style={{ width: "40px" }}
                                                >
                                                    <i
                                                        className={
                                                            "fa fa-calendar"
                                                        }
                                                    />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Col className="p-0">
                                                <DatePicker
                                                    className={classNames(
                                                        {
                                                            "is-invalid": this
                                                                .state
                                                                .birthDateError
                                                                .state
                                                        },
                                                        "form-control"
                                                    )}
                                                    required
                                                    fixedHeight
                                                    popperPlacement="bottom"
                                                    showYearDropdown={true}
                                                    selected={
                                                        this.state.birthDate
                                                    }
                                                    maxDate={moment(
                                                        moment().year(
                                                            moment().year() - 13
                                                        )
                                                    )}
                                                    minDate={moment(
                                                        moment().year(
                                                            moment().year() - 90
                                                        )
                                                    )}
                                                    locale={i18n.language}
                                                    onChange={value => {
                                                        if (
                                                            validator.isBefore(
                                                                value.format(),
                                                                moment()
                                                                    .year(
                                                                        moment().year() -
                                                                            13
                                                                    )
                                                                    .format()
                                                            ) &&
                                                            validator.isAfter(
                                                                value.format(),
                                                                moment()
                                                                    .year(
                                                                        moment().year() -
                                                                            90
                                                                    )
                                                                    .format()
                                                            )
                                                        ) {
                                                            this.setInputs({
                                                                target: {
                                                                    name:
                                                                        "birthDate",
                                                                    value: value
                                                                }
                                                            });
                                                        }
                                                    }}
                                                />
                                            </Col>
                                            <FormFeedback>
                                                {"342343"}
                                            </FormFeedback>
                                        </InputGroup>
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
                                            }}
                                            icon={"fa fa-hashtag"}
                                            errorMessage="342343"
                                        />
                                        <Inputs
                                            classError={
                                                this.state.passwordError.state
                                            }
                                            placeholder={t("password")}
                                            type={"password"}
                                            name={"password"}
                                            value={this.state.password}
                                            onChange={e => {
                                                this.setInputs(e);
                                            }}
                                            icon={"fa  fa-circle-o-notch"}
                                            errorMessage="342343"
                                        />
                                        <Inputs
                                            classError={
                                                this.state.confirmPasswordError
                                                    .state
                                            }
                                            type={"password"}
                                            placeholder={t("passwordConfirm")}
                                            name={"confirmPassword"}
                                            value={this.state.confirmPassword}
                                            onChange={e => {
                                                this.setInputs(e);
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
