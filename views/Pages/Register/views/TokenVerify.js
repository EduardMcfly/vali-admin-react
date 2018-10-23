import React, { Component } from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Col,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormFeedback,
    Row
} from "reactstrap";
import { I18n } from "react-i18next";
import Link from "react-router-dom/Link";
import EmailInput from "../components/EmailInput";
import axios from "axios";
import classNames from "classnames";
import validator from "validator";

class TokenVerify extends Component {
    constructor(props) {
        super(props);
        this.tokenSubmit = this.tokenSubmit.bind(this);
        this.state = {
            sendLogin: false,
            emailError: { message: false },
            codeError: { message: false },
            errors: { inputs: { email: false }, messages: { email: "" } }
        };
        this.resetErrosInputs = this.resetErrosInputs.bind(this);
        this.validateInputs = this.validateInputs.bind(this);
    }

    resetErrosInputs() {
        this.setState({
            emailError: { message: false }
        });
    }

    errorInputs(errors) {
        this.resetErrosInputs();
        this.errorInput(errors.email, "emailError");
        this.errorInput(errors.code, "codeError");
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

    validateInputs(t){
        if (!this.props.verifyEmail()) {
            console.log(t('active_url'));
            /* this.errorInput() */
        }
    }

    tokenSubmit(t) {
        this.validateInputs(t)
        if (validator.isEmail(this.props.email.input)) {
            return true;
        } else {
            return false;
        }
        this.setState({ sendLogin: true });
        return axios({
            method: "post",
            url: "./registerVerifyPin",
            data: { email: this.props.email.input, code: this.props.code.input }
        })
            .then(res => {
                if (typeof res.data.success !== "undefined") {
                    this.props.history.push("/register/token/");
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
        /* setTimeout(() => {
            this.props.history.push("/register/token/32233");
        }, 1000); */
    }

    render() {
        return (
            <I18n ns={['register','login']}>
                {(t, { i18n }) => (
                    <Row className="justify-content-center">
                        <Col sm={"12"} md={"9"} lg={"6"} xl={"6"}>
                            <Card className="mx-4">
                                <CardFooter>
                                    <h3>{t("verifyTokenTitle")}</h3>
                                    <span className="text-muted">
                                        {t("verifyTokenSubtitle")}
                                    </span>
                                </CardFooter>
                                <CardBody className="p-4">
                                    <Form>
                                        <EmailInput
                                            value={this.props.email.input}
                                            setInputs={this.props.setInputs}
                                            emailError={
                                                this.state.emailError.message
                                            }
                                            resetErrosInputs={
                                                this.resetErrosInputs
                                            }
                                        />
                                        <label className="text-muted" />
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText
                                                    className={
                                                        "d-flex justify-content-center"
                                                    }
                                                    style={{ width: "40px" }}
                                                >
                                                    <i className="fa fa-slack" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="number"
                                                className={classNames({
                                                    "is-invalid": this.state
                                                        .codeError.message
                                                })}
                                                placeholder={t(
                                                    "labelCodeRecived"
                                                )}
                                                autoComplete="false"
                                                name="code"
                                                value={this.props.code.input}
                                                onChange={e => {
                                                    this.props.setInputs(e);
                                                    if (
                                                        this.state.codeError
                                                            .message
                                                    ) {
                                                        this.resetErrosInputs();
                                                    }
                                                }}
                                            />
                                            <FormFeedback>
                                                {this.state.codeError.message}
                                            </FormFeedback>
                                        </InputGroup>
                                        <Button
                                            onClick={() => this.tokenSubmit(t)}
                                            color="info"
                                            block
                                        >
                                            {console.log(i18n)}
                                            {t("confirm")}
                                        </Button>
                                    </Form>
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
                            </Card>
                        </Col>
                    </Row>
                )}
            </I18n>
        );
    }
}
export default TokenVerify;
