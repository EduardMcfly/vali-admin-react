import React, { Component } from "react";
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Row
} from "reactstrap";
import { I18n } from "react-i18next";
import Link from "react-router-dom/Link";
import { LoginComponent, Header } from "../../../components";
import axios from "axios";

class Login extends Component {
    constructor(props) {
        super(props);
        this.sendRequest = this.sendRequest.bind(this);
        this.toggleEllipsisDropDown = this.toggleEllipsisDropDown.bind(this);
        this.state = {
            userDropdownOpen: false
        };
        this.sendRequest();
    }

    toggleEllipsisDropDown() {
        this.setState(prevState => ({
            userDropdownOpen: !prevState.userDropdownOpen
        }));
    }

    sendRequest() {
        axios({
            method: "post",
            url: "./verifyAuth"
        })
            .then(res => {
                if (typeof res.data.auth !== "undefined") {
                    if (res.data.auth) {
                        this.props.userAuth.login();
                    }
                }
            })
            .catch(error => {
                if (typeof error.data.redirect !== "undefined") {
                    this.props.userAuth.login();
                }

                if (typeof error.data.auth !== "undefined") {
                    if (error.data.auth) {
                        this.props.userAuth.login();
                    }
                }
            });
    }
    render() {
        return (
            <div className="app flex-row align-items-center">
                <div className="app-header pr-1">
                    <Header {...this.props} />
                </div>
                <Container>
                    <div
                        className="app-content ml-0"
                        style={{ minHeight: "unset" }}
                    >
                        <I18n ns="login">
                            {(t, { i18n }) => (
                                <Row className="justify-content-center">
                                    <Col md="12" lg="10">
                                        <CardGroup>
                                            <LoginComponent
                                                userAuth={this.props.userAuth}
                                            />
                                            <Card
                                                className="d-none d-md-block text-white bg-primary py-5"
                                                style={{ width: 44 + "%" }}
                                            >
                                                <CardBody className="text-center">
                                                    <div>
                                                        <h2>Sign up</h2>
                                                        <p>
                                                            Lorem ipsum dolor
                                                            sit amet,
                                                            consectetur
                                                            adipisicing elit,
                                                            sed do eiusmod
                                                            tempor incididunt ut
                                                            labore et dolore
                                                            magna aliqua.
                                                        </p>
                                                        <Link to={"/register"}>
                                                            <Button
                                                                color="primary"
                                                                className="mt-3"
                                                                active
                                                            >
                                                                Register Now!
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </CardGroup>
                                    </Col>
                                </Row>
                            )}
                        </I18n>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Login;
