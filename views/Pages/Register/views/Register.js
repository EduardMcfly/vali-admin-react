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
        };
        console.log(this);
        
    }


    render() {
        return (
            <I18n ns="register">
                {(t, { i18n }) => (
                    <Row className="justify-content-center">
                        <Col md={"9"} lg={"7"} xl={"6"}>
                            <Card className="tileAnimation">
                                <CardBody className="p-4">
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
                                                type="text"
                                                placeholder={t("emailTitle")}
                                                autoComplete="email"
                                                name="email"
                                            />
                                        </InputGroup>
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
                            </Card>
                        </Col>
                    </Row>
                )}
            </I18n>
        );
    }
}

export default Register;
