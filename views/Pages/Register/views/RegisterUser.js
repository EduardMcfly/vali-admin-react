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
        this.registerSubmit = this.registerSubmit.bind(this);
        this.state = {
            overlay: false,
            registerSuccess: false,
            name: "",
            lastName: "",
            number: "",
            identity: "",
            birthDate: moment().year(moment().year() - 18),
            password: "",
            confirmPassword: "",
            nameError: { message: "", state: false },
            lastNameError: { message: "", state: false },
            numberError: { message: "", state: false },
            identityError: { message: "", state: false },
            birthDateError: { message: "", state: false },
            passwordError: { message: "", state: false },
            confirmPasswordError: { message: "", state: false }
        };
        this.setInputs = this.setInputs.bind(this);
        this.resetErrosInputs = this.resetErrosInputs.bind(this);
        this.resetErrosInput = this.resetErrosInput.bind(this);
        this.validateInputs = this.validateInputs.bind(this);
    }

    toggleOverlay(state: boolean) {
        this.setState({
            overlay: state
        });
    }

    setInputs(e) {
        if (this.state[e.target.name + "Error"].message) {
            this.resetErrosInput({
                input: e.target.name + "Error"
            });
        }
        this.setState({ [e.target.name]: e.target.value });
    }

    resetErrosInput({ input, state = false }) {
        this.setState({
            [input]: { message: "", state: state }
        });
    }
    resetErrosInputs({ states }) {
        this.validations = true;
        states.map((state, key) => {
            this.resetErrosInput({ input: state });
        });
    }

    errorInputs(errors) {
        this.errorInput(errors.email, "emailError");
        this.errorInput(errors.code, "codeError");
        this.errorInput(errors.name, "nameError");
        this.errorInput(errors.lastName, "lastNameError");
        this.errorInput(errors.number, "numberError");
        this.errorInput(errors.identity, "identityError");
        this.errorInput(errors.birthDate, "birthDateError");
        this.errorInput(errors.password, "passwordError");
        this.errorInput(errors.confirmPassword, "confirmPasswordError");
    }

    errorInput(error, inputError) {
        if (typeof error !== "undefined") {
            this.errorsSet(error, inputError);
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
        this.resetErrosInputs({
            states: [
                "nameError",
                "lastNameError",
                "numberError",
                "identityError",
                "birthDateError",
                "passwordError",
                "confirmPasswordError"
            ]
        });
        const { props, state } = this;
        const {
            name,
            lastName,
            number,
            identity,
            password,
            confirmPassword
        } = state;

        if (!props.verifyEmail()) {
            this.errorInput(<MessagesTranslate type={"email"} />, "emailError");
        }
        if (!props.verifyCode()) {
            this.errorInput(
                <MessagesTranslate type={"numeric"} />,
                "codeError"
            );
        }
        if (!validator.isAlpha(validator.blacklist(name, " "))) {
            this.errorInput(
                <MessagesTranslate
                    type={validator.isEmpty(name) ? "isEmpty" : "alpha"}
                />,
                "nameError"
            );
        }
        if (!validator.isAlpha(validator.blacklist(lastName, " "))) {
            this.errorInput(
                <MessagesTranslate
                    type={validator.isEmpty(lastName) ? "isEmpty" : "alpha"}
                />,
                "lastNameError"
            );
        }
        if (!validator.isNumeric(number)) {
            this.errorInput(
                <MessagesTranslate
                    type={validator.isEmpty(number) ? "isEmpty" : "numeric"}
                />,
                "numberError"
            );
        }
        if (!validator.isNumeric(identity)) {
            this.errorInput(
                <MessagesTranslate
                    type={validator.isEmpty(identity) ? "isEmpty" : "numeric"}
                />,
                "identityError"
            );
        }

        if (!validator.isAlphanumeric(password)) {
            this.errorInput(
                <MessagesTranslate
                    type={validator.isEmpty(password) ? "isEmpty" : "alpha"}
                />,
                "passwordError"
            );
        }
        if (!validator.isAlphanumeric(confirmPassword)) {
            this.errorInput(
                <MessagesTranslate
                    type={
                        validator.isEmpty(confirmPassword) ? "isEmpty" : "alpha"
                    }
                />,
                "confirmPasswordError"
            );
        }
        return this.validations;
    }

    registerSubmit() {
        const { props, state } = this;
        const {
            name,
            lastName,
            number,
            identity,
            birthDate,
            password,
            confirmPassword
        } = state;
        if (this.validateInputs()) {
            const { toggleOverlay } = props;
            this.toggleOverlay(true);
            axios({
                method: "post",
                url: "./register",
                data: {
                    email: props.email.input,
                    code: props.code.input,
                    name: name,
                    lastName: lastName,
                    number: number,
                    birthDate: moment(birthDate).format("YYYY-MM-DD"),
                    identity: identity,
                    password: password,
                    confirmPassword: confirmPassword
                }
            })
                .then(res => {
                    this.toggleOverlay(false);
                    if (typeof res.data.success !== "undefined") {
                        this.setState({ registerSuccess: true });
                        setTimeout(() => {
                            props.history.push("/login");
                        }, 2000);
                    } else if (typeof res.data.errors !== "undefined") {
                        this.errorInputs(res.data.errors);
                    }
                })
                .catch(res => {
                    this.toggleOverlay(false);
                    if (typeof res.data.errors !== "undefined") {
                        this.errorInputs(res.data.errors);
                    }
                });
        }
    }

    render() {
        const { state } = this;
        const {
            overlay,
            name,
            nameError,
            lastName,
            lastNameError,
            birthDate,
            birthDateError,
            number,
            numberError,
            identity,
            identityError,
            password,
            passwordError,
            confirmPasswordError,
            confirmPassword,
            registerSuccess
        } = state;

        return (
            <Row className="justify-content-center">
                <Col sm={"12"} md={"9"} lg={"6"} xl={"6"} className={"p-0"}>
                    <I18n ns={["register"]}>
                        {(t, { i18n }) => (
                            <React.Fragment>
                                <Card className="mx-4 tileAnimation">
                                    <CardHeader>
                                        <h1>{t("registerTitle")}</h1>
                                        <p className="text-muted">
                                            {t("registerSubtitle")}
                                        </p>
                                    </CardHeader>
                                    <CardBody
                                        className={classNames(
                                            { "d-none": !!registerSuccess },
                                            "p-4"
                                        )}
                                    >
                                        <Inputs
                                            placeholder={t("name")}
                                            autoComplete={"off"}
                                            name={"name"}
                                            value={name}
                                            onChange={this.setInputs}
                                            icon={"fa fa-info-circle"}
                                            error={nameError}
                                        />
                                        <Inputs
                                            placeholder={t("lastName")}
                                            autoComplete={"off"}
                                            name={"lastName"}
                                            value={lastName}
                                            onChange={this.setInputs}
                                            icon={"fa fa-info"}
                                            error={lastNameError}
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
                                                            "is-invalid":
                                                                birthDateError.state
                                                        },
                                                        "form-control"
                                                    )}
                                                    required
                                                    fixedHeight
                                                    popperPlacement="bottom"
                                                    showYearDropdown={true}
                                                    selected={birthDate}
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
                                            placeholder={t("identity")}
                                            name={"identity"}
                                            value={identity}
                                            onChange={this.setInputs}
                                            icon={"fa fa-id-card"}
                                            error={identityError}
                                        />
                                        <Inputs
                                            type={"number"}
                                            placeholder={t("number")}
                                            name={"number"}
                                            value={number}
                                            onChange={this.setInputs}
                                            icon={"fa fa-hashtag"}
                                            error={numberError}
                                        />
                                        <Inputs
                                            placeholder={t("password")}
                                            type={"password"}
                                            name={"password"}
                                            value={password}
                                            onChange={this.setInputs}
                                            icon={"fa  fa-circle-o-notch"}
                                            error={passwordError}
                                        />
                                        <Inputs
                                            type={"password"}
                                            placeholder={t("passwordConfirm")}
                                            name={"confirmPassword"}
                                            value={confirmPassword}
                                            onChange={e => {
                                                this.resetErrosInput({
                                                    input:
                                                        "confirmPasswordError",
                                                    state: password.match(
                                                        new RegExp(
                                                            e.target.value +
                                                                ".*"
                                                        )
                                                    )
                                                        ? false
                                                        : true
                                                });
                                                this.setInputs(e);
                                            }}
                                            icon={"fa fa-dot-circle-o"}
                                            error={confirmPasswordError}
                                        />
                                        <Button
                                            onClick={() =>
                                                this.registerSubmit()
                                            }
                                            color={"info"}
                                            block
                                        >
                                            {t("confirm")}
                                        </Button>
                                    </CardBody>
                                    <CardBody
                                        className={classNames(
                                            { "d-none": !registerSuccess },
                                            "p-4 text-success"
                                        )}
                                        style={{
                                            margintTop: "-14px",
                                            paddingLeft: " 13px",
                                            padding: " 50px",
                                            fontSize: " 24px",
                                            fontWeight: " 600",
                                            textAlign: " center"
                                        }}
                                    >
                                        {t("registerPerfect")}.
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
                                    <Overlay state={overlay} />
                                </Card>
                            </React.Fragment>
                        )}
                    </I18n>
                </Col>
            </Row>
        );
    }
}
export default ResgisterUser;
