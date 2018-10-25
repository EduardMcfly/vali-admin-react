import React, { Component } from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Col,
    InputGroup,
    Row
} from "reactstrap";
import { I18n } from "react-i18next";
import Link from "react-router-dom/Link";
import classNames from "classnames";
import EmailInput from "../components/EmailInput";
import SendEmailToken from "../components/SendEmailToken";
import { Overlay } from "../../../../components";

// routes config

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailError: { message: false }
        };
        this.resetErrosInputs = this.resetErrosInputs.bind(this);
    }

    resetErrosInputs() {
        this.setState({
            emailError: { message: false }
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
                {t => (
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
                                            setInputs={this.props.setInputs}
                                            emailError={
                                                this.state.emailError.message
                                            }
                                            resetErrosInputs={
                                                this.resetErrosInputs
                                            }
                                        />
                                        <Button
                                            color={classNames("success", {
                                                disabled:
                                                    this.props.verifyEmail() ===
                                                    false
                                            })}
                                            block
                                            onClick={() => {
                                                if (this.props.verifyEmail()) {
                                                    SendEmailToken(this);
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
                                <Overlay state={this.props.overlay} />
                                <CardFooter className="p-0">
                                    <Row>
                                        <Col
                                            xs="6"
                                            sm="6"
                                            className={"mx-auto"}
                                        >
                                            <Link to={"/login"}>
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
