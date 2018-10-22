import React, { Component } from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from "reactstrap";
import { I18n } from "react-i18next";
import Link from "react-router-dom/Link";
class TokenVerify extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <I18n ns="register">
                {(t, { i18n }) => (
                    <Row className="justify-content-center">
                        <Col md="9">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <Form>
                                        <h1>Register</h1>
                                        <p className="text-muted">
                                            Create your account</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon
                                                ddonType="prepend">
                                                <InputGroupText>@</InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="text"
                                                placeholder="Email"
                                                autoComplete="email"
                                            />



                                        </InputGroup>
                                        <Button color="success" block>
                                            Create Account</Button>
                                        <Link to={"/login"}>
                                            <Button
                                                className="mt-2"
                                                color="primary"
                                                block
                                            >
                                                Login
                                            </Button>
                                        </Link>
                                    </Form>
                                </CardBody>
                                <CardFooter className="p-4">
                                    <Row>
                                        <Col xs="12" sm="6">
                                            <Button
                                                className="btn-facebook"
                                                block
                                            >
                                                <span>facebook</span>
                                            </Button>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <Button
                                                className="btn-twitter"
                                                block
                                            >
                                                <span>twitter</span>
                                            </Button>
                                        </Col>
                                        <Link to={"/register"}>Register</Link>
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